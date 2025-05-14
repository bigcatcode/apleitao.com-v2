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
        '1630': '1630px',
        '1330': '1330px',
        '1060': '1060px',
        '960': '960px',
        '540': '540px',
      },
    },
  },
  plugins: [],
};
