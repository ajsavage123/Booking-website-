/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      colors: {
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        brand: {
          50: "#f0fdf9",
          100: "#d0f5ee",
          200: "#a3ebde",
          300: "#65d8c5",
          400: "#2ebdaa",
          500: "#17a090",
          600: "#128075",
          700: "#136660",
          800: "#14524e",
          900: "#154542",
          950: "#052b29",
        },
        coral: {
          400: "#fb7a6e",
          500: "#f85f51",
        },
        slate: {
          850: "#1a2438",
        },
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(at 40% 20%, hsla(174,60%,94%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,60%,91%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(174,50%,96%,1) 0px, transparent 50%)",
        "mesh-dark":
          "radial-gradient(at 40% 20%, hsla(174,60%,10%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,50%,8%,1) 0px, transparent 50%)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
