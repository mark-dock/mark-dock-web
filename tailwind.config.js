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
      green: colors.green,
      gray: colors.gray,
      blue: colors.blue,
      red: colors.red,
      yellow: colors.yellow,
      neutral: colors.neutral,
      'scheme': {
        100: '#0d1b2a',
        200: '#1b263b',
        250: '#2c3e50',
        300: '#415a77',
        400: '#778da9',
        500: '#e0e1dd',
      },
      saveGreen: '#b9ffb9',
      deleteRed: '#E63946',
      hoverRed: '#D62839',
      backRed: '#ff8a8a',
    },
  },
  plugins: [
  ],
}

