/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      red: colors.red,
      neutral: colors.neutral,
      'scheme': {
        100: '#0d1b2a',
        200: '#1b263b',
        250: '#2e4165',
        300: '#415a77',
        400: '#778da9',
        500: '#e0e1dd',
      },
    },
  },
  plugins: [
  ],
}

