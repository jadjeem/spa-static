module.exports = {
  i18n: {
    locales: ['ar'],
    defaultLocale: 'ar',
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/spa',
        permanent: false,
      },
      {
        source: '/kids-club',
        destination: '/kids-club/services',
        permanent: false,
      },
      {
        source: '/beauty-shop',
        destination: '/beauty-shop/prices',
        permanent: false,
      },
      {
        source: '/clothes',
        destination: '/clothes/prices',
        permanent: false,
      },
      {
        source: '/spa/prices/offers',
        destination: '/spa/prices/offers/bride',
        permanent: false,
      },
    ]
  },
}
