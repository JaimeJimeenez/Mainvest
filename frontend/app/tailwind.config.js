/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'blue-ribbon': {
          '50': '#f1f7ff',
          '100': '#e5edff',
          '200': '#cedfff',
          '300': '#a7c2ff',
          '400': '#769aff',
          '500': '#3f68ff',
          '600': '#183cff',
          '700': '#072efa',
          '800': '#0526d2',
          '900': '#0620ac',
          '950': '#00187a',
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

