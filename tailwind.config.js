// tailwind.config.js
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E9ECF7",
          100: "#7D97C6",
          200: "#476DAD",
          300: "#2C58A1",
          400: "#F75C1A",
          500: "#0F3C87",
          600: "#0E377B",
          700: "#0D3270",
          800: "#0C2D66",
          900: "#0B295D",
          DEFAULT: "#F75C1A",
        },
        
      },
    },
  },
  plugins: [],
};
