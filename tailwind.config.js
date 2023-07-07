/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {},
    colors: {
      primary: '#7868E6',
      sub: '#6857DC',
      iris: '#7879F1',
      primaryDark: '#6875F5',
      bgDark: '#111827',
      secondaryTextDark: '#a5a8ad',
      secondaryTextWhite: 'text-gray-800',
      primaryCardDark: '#1f2937',
      footerDark: '#374151'
    }
  },
  plugins: [require('flowbite/plugin')]
}
