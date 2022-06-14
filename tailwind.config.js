module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Barlow",
    },
    letterSpacing: {
      wider: "2px",
      widest: "3px",
    },
    extend: {
      colors: {
        akuma: "#E93420",
      },
      gridTemplateColumns: {
        50: "repeat(50, 1fr)",
      },
      borderWidth: {
        3: "3px",
      },
      spacing: {
        "1px": "1px",
        22: "5.5rem",
        26: "6.5rem",
        34: "8.5rem",
        38: "9.5rem",
        xl: "80rem",
      },
      height: {
        "c-offset": "calc(100vh - 6.5rem)",
      },
      width: {
        "page-content": "calc(100% - 14rem)",
      },
    },
  },
  plugins: [],
};