/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.hide-number-arrows': {
          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: '0',
          },
          '&[type=number]': {
            '-moz-appearance': 'textfield',
          },
        },
      })
    },
    function ({ addUtilities }) {
      addUtilities({
        '.caret-transparent': {
          caretColor: 'transparent',
        },
      });
    }
  ],
}