/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,tsx}",
  ],

  theme: {
    extend: {
      screens:{
        // 'xs':'400px',
          'xs':'360px'
      },
    },
    
  },
  plugins: [],
}
