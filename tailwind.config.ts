import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { sand: "#c8b79f", ink: "#171714", concrete: "#e8e5df" },
      fontFamily: { sans: ["var(--font-manrope)"], display: ["var(--font-cormorant)"] }
    }
  },
  plugins: []
} satisfies Config;
