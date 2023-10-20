/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'black': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#000000',
        },
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
  plugins: [],
}
