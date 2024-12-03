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
      neutral: colors.neutral,
      'scheme': {
        100: '#0d1b2a',
        200: '#1b263b',
        250: '#2c3e50',
        hover250: '#243642',
        300: '#415a77',
        400: '#778da9',
        500: '#e0e1dd',
      },
      saveGreen: '#b9ffb9',
      deleteRed: '#E63946',
      backRed: '#ff8a8a',
      
      red: '#D62839',        
      hoverRed: '#FF4D4D',   
      green: '#2D8F3A',      
      hoverGreen: '#66C17B', 
      yellow: '#D8A200',     
      hoverYellow: '#FFD54F', 
      blue: '#2A6BBF',       
      hoverBlue: '#5A99E0',
    },
  },
  plugins: [
  ],
}

