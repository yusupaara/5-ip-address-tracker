/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          xdark: 'hsl(0, 0%, 17%)',
          dark: 'hsl(0, 0%, 59%)',
        },
        side: {
          tr10: 'hsla(0, 0%, 0%, 0.1)',
          tr50: 'hsla(0, 0%, 0%, 0.5)',
        }
      },
      fontFamily: {
        rubik: ['Rubik', 'Sans-serif']
      },
      fontSize: {
        default: '18px'
      },
      backgroundImage: {
        dekstop: 'url("/src/images/pattern-bg-desktop2.png")'
      },
      animation: {
        'linear-background-xl': 'keyload 29.16s linear infinite',
        'linear-background-lg': 'keyload 38s linear infinite',
        'linear-background-md': 'keyload 49s linear infinite',
        'linear-background-sm': 'keyload 65s linear infinite',
      },
      keyframes: {
        'keyload': {
          'from': { 'background-position': '0 0' },
          'to': { 'background-position': '400% 0%' },
        },
      },
      screens: {
        xs: '450px',
      }
    },
    fontWeight: {
      thin: '400',
      normal: '500',
      bold: '700'
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

