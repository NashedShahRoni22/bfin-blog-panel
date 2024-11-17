/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2d67b2",
      },
      fontFamily: {
        "nunito-sans": ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
