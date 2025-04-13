/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <-- make sure this matches your React files
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        '1630': '1630px', // Add a custom breakpoint for 1630px
      },
    },
  },
  plugins: [],
};
