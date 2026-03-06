import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pokemon: ["'Nunito'", "sans-serif"],
      },
      colors: {
        pokemon: {
          yellow: "#FFCB05",
          blue: "#3B5BA7",
          red: "#CC0000",
          dark: "#1a1a2e",
        },
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-16px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease forwards",
        slideIn: "slideIn 0.3s ease forwards",
        shimmer: "shimmer 2s infinite linear",
      },
    },
  },
  plugins: [],
} satisfies Config;
