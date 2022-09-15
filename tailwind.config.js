const { colors } = require(`tailwindcss/defaultTheme`)

module.exports = {
  mode: "jit", // see https://tailwindcss.com/docs/just-in-time-mode
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  darkMode: false, // or "media" or "class"
  theme: {
    extend: {
      colors: {
        // primary: colors.indigo,
        // Green
        // primary: {
        //   900: '#0a4312',
        // },
        primary: {
          50: '#f5ebe0',
          100: '#f0e0d1',
          200: '#ebd6c2',
          300: '#e6ccb3',
          400: '#e0c2a3',
          500: '#dbb894',
          600: '#d6ad85',
          700: '#d1a375',
          800: '#cc9966',
          900: '#b88a5c',
          1000: '#a37a52'
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          md: "2rem",
        },
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    // minWidth: {
    //   '1/4': '25%',
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
