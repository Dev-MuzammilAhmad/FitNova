/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:    "#1A1A1A",   // Main background
        secondary:  "#252525",   // Card / navbar background
        accent:     "#FF5A2E",   // Primary orange accent
        accentDark: "#DD4921",   // Darker orange (hover, featured)
        textMain:   "#D3D3D3",   // Body text
        textContrast: "#FFFFFF", // Headings / contrast text
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}