/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#F1BB45",
        dark: "#CD8D00",
        highlight: "#00FFE0",
        tColor: "#454545",
        customDark: "#1f2937",
      },
      boxShadow:{
        custom: "0 0 40px #ccc"
      } 
    },
  },
  plugins: [],
}