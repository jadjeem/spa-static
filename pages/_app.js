import App from "next/app"
import Head from "next/head"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import { DefaultSeo } from "next-seo"
import { getStrapiMedia } from "utils/media"
import { getGlobalData } from "utils/api"
import "@/styles/index.css"

const MyApp = ({ Component, pageProps }) => {
  // Extract the data we need
  const { global } = pageProps
  if (!global || !global.attributes) {
    return <ErrorPage statusCode={404} />
  }

  const { metadata, favicon, metaTitleSuffix } = global.attributes

  return (
    <>
      {/* Favicon */}
      <Head>
        <link
          rel="shortcut icon"
          href={'/logo'}
        />
      </Head>
      {/* Global site metadata */}
      <DefaultSeo
        titleTemplate={`%s | ${metaTitleSuffix}`}
        title="Page"
        description={metadata.metaDescription}
        // openGraph={{
        //   images: Object.values(
        //     metadata.shareImage.data.attributes.formats
        //   ).map((image) => {
        //     return {
        //       url: getStrapiMedia(image.url),
        //       width: image.width,
        //       height: image.height,
        //     }
        //   }),
        // }}
      />
      {/* Display the content */}
      <Component {...pageProps} />
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (appContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  const globalLocale = await getGlobalData()

  return {
    ...appProps,
    pageProps: {
      global: globalLocale,
    },
  }
}

export default MyApp
