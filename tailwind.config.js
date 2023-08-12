/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customOrange:"#f48225"
      },
      screens:{
        'md':'617px',
        'md2':'817px'
      }
    },
  },
  plugins: [],
}

