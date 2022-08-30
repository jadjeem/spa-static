import ErrorPage from 'next/error';
import { getPageData, fetchAPI, getGlobalData, getTabData } from 'utils/api';
import Sections from '@/components/sections';
import Seo from '@/components/elements/seo';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import { getLocalizedPaths } from 'utils/localize';
import Sider from '@/components/elements/sider';

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicPage = ({
  sections,
  metadata,
  preview,
  global,
  pageContext,
  sider,
}) => {
  const router = useRouter();

  // Check if the required data was provided
  if (!router.isFallback && !sections?.length) {
    return <ErrorPage statusCode={404} />;
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className='container'>Loading...</div>;
  }

  // Merge default site SEO settings with page specific SEO settings
  if (metadata.shareImage?.data == null) {
    delete metadata.shareImage;
  }
  const metadataWithDefaults = {
    ...global.attributes.metadata,
    ...metadata,
  };

  return (
    <Layout global={global} pageContext={pageContext} sider={sider}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadataWithDefaults} />
      {/* {
        // Sider goes here...
        sider.data && <Sider sider={sider} />
      } */}
      {/* Display content sections */}
      <Sections sections={sections} preview={preview} />
    </Layout>
  );
};

export async function getStaticPaths(context) {
  const pages = await fetchAPI('/pages', {
    // locale,
    pagination: {
      page: 0,
      pageSize: 100,
    },
    fields: ['slug'],
  },
  );

  console.log(pages) ///////////////////////////////////////////

  const paths = pages.data.map((page) => {
    const { slug } = page.attributes;
    // Decompose the slug that was saved in Strapi
    const slugArray = !slug ? false : slug.split('/');
    // console.log(slug);
    return {
      params: { slug: slugArray },
      // Specify the locale to render
      // locale,
    };
  });
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { params, preview = null } = context;
  try {
    const globalLocale = await getGlobalData();

    if (!globalLocale) throw new Error('getGlobalData failed');

    // Fetch pages. Include drafts if preview mode is on
    const pageData = await getPageData({
      slug: (!params.slug ? [''] : params.slug).join('/'),
      // locale,
      preview,
    });

    if (!pageData) throw new Error('getPageData failed');

    // Fetch Tab data (footer here)
    const tabSlug = (!params.slug ? [''] : params.slug)[0].split('/').join('/');

    const tabData = await getTabData({
      slug: tabSlug,
    });

    if (!tabData) throw new Error('getTabData failed');

    if (pageData == null) {
      // Giving the page no props will trigger a 404 page
      return { props: {} };
    }

    // We have the required page data, pass it to the page component
    const { contentSections, metadata, slug, sider } =
      pageData.attributes;

    globalLocale.data.attributes.footer = tabData.attributes.footer[0];

    const pageContext = {
      // defaultLocale,
      slug,
      localizations: null,
    };

    // const localizedPaths = getLocalizedPaths(pageContext);

    return {
      props: {
        preview,
        sections: contentSections,
        metadata,
        global: globalLocale.data,
        pageContext: {
          ...pageContext,
          // localizedPaths,
        },
        // tab: tabData,
        sider,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
}

export default DynamicPage;
