const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      three: '350px',
      five: '500px',
      tablet: '640px',
      ltab: '780px',
      xtab: '960px',
      ltop: '1050px',
      desktop: '1280px',
      lg: '1440px',
      xl: '1600px',
    },
    colors: {
      ...colors,
      'light-slate': {
        DEFAULT: '#f4f5fe',
      },
    },
  },
  plugins: [],
}
