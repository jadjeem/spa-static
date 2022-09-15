module.exports = {
  // i18n: {
  //   locales: ['ar'],
  //   defaultLocale: 'ar',
  // },
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
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
        destination: '/beauty-shop/makeup',
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
