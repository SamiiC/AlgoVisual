/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'Col': "repeat(67, 0fr)",
      },
      backgroundOpacity: {
        '10': '0.1',
        '20': '0.2',
        '40': '0.4',
       }
    },
  },
  plugins: [],
};