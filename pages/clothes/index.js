import { getPageData, fetchAPI, getGlobalData, getTabData } from 'utils/api';
import Seo from '@/components/elements/seo';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import { useEffect, useMemo, useState } from 'react';
import { getClothes } from '../api/api';
import ProductsView from '@/components/elements/products-view';
import Loader from '@/components/elements/loader';

const ClothesPage = ({ global, pageContext }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const sider = useMemo(() => ({
    data: {
      id: 'clothesId',
      attributes: {
        name: 'clothes',
        content: [
          {
            id: 'clothes-clothes',
            url: '/clothes',
            newTab: false,
            text: 'الملابس',
            __typename: 'ComponentLinksLink',
          },
          {
            id: 'clothes-lingerie',
            url: '/clothes/lingerie',
            newTab: false,
            text: 'اللانجري',
            __typename: 'ComponentLinksLink',
          },
        ],
      },
    },
  }), []);

  useEffect(() => {
    const fetch = async () => {
      console.log('refresh');
    const { data, meta } = await getClothes({ page });
    setData(data);
    setLoading(false);
    setMeta(meta);
    }
    fetch()
  }, [page]);

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className='container'>Loading...</div>;
  }

  const metadataWithDefaults = {
    ...global.attributes.metadata,
    // ...metadata,
  };

  return (
    <Layout global={global} pageContext={pageContext} sider={sider}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadataWithDefaults} />
      {/* Content */}
      {loading ? (
        <div className='w-full, h-full flex justify-center items-center'>
          <Loader width={50} height={50} />
        </div>
      ) : (
        <ProductsView
          products={data}
          totalCount={meta?.pagination.total}
          pageSize={meta?.pagination.pageSize}
          page={page}
          setPage={setPage}
        />
      )}
    </Layout>
  );
};

export async function getStaticProps(context) {
  const { preview = null } = context;
  try {
    const globalLocale = await getGlobalData();

    if (!globalLocale) throw new Error('getGlobalData failed');

    // Fetch Tab data (footer here)
    const tabSlug = 'clothes';

    const tabData = await getTabData({
      slug: tabSlug,
    });

    if (!tabData) throw new Error('getTabData failed');

    globalLocale.data.attributes.footer = tabData.attributes.footer[0];

    const pageContext = {
      // defaultLocale,
      slug: 'clothes',
      localizations: null,
    };

    return {
      props: {
        preview,
        global: globalLocale.data,
        pageContext: {
          ...pageContext,
        },
      },
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
}

export default ClothesPage;
