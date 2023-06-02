/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
  "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
        primary: "#7868E6",
        sub: "#6857DC",
        iris: "#7879F1",
        ...require("tailwindcss/colors"),
    },
    fontFamily: {
        gotham: ["Gotham", "sans-serif"],
    },
    extend: {},
},
plugins: [require("flowbite/plugin")],
};

