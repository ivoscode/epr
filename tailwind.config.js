module.exports = {
  important: true,
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: { "8xl": "90rem" },
      colors: {
        "primary-text-color": "var(--primary-text-color)",
        "chevron-color": "var(--chevron-color)",
        "chevron-hover-color": "var(--chevron-hover-color)",
        "comp-border-color": "var(--comp-border-color)",
        "comp-bg-color": "var(--comp-bg-color)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
