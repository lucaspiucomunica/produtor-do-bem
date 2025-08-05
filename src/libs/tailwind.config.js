/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../*',
    '../../src/js/*',
    '../../inc/**/*.php',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          'principal': '#13863D',
          'variacao-1': '#117937',
          'variacao-2': '#0F6B31',
          'variacao-3': '#0D5E2B',
          'variacao-4': '#0B5025',
          'variacao-5': '#0A431F',
        },
      },
    },
  },
  plugins: []
}

