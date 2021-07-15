module.exports = {
  important: true,
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "(screen-20)": "calc(100vh - 5rem)",
      },
      maxWidth: { "8xl": "90rem", "9xl": "100rem" },
      colors: {
        "main-bg-color": "var(--main-bg-color)",
        "main-text-color": "var(--main-text-color)",
        "chevron-color": "var(--chevron-color)",
        "chevron-hover-color": "var(--chevron-hover-color)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
