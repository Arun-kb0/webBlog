/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,tsx}",
  ],

  theme: {
    extend: {
      screens:{
        'xs':'400px'
      }
    },
  },
  plugins: [],
}
