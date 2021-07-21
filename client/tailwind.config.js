const plugin = require("tailwindcss/plugin");

module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
  ],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "m-plus-rounded": ['"M PLUS Rounded 1c"', "sans-serif"],
      },
      width: {
        98: "98%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
