import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        dogify: {
          blue: "#3B82F6",
          cyan: "#22D3EE",
          green: "#22C55E",
          ink: "#F8FAFC",
          cloud: "#0F172A"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 90px rgba(34, 211, 238, 0.25)",
        premium: "0 30px 100px rgba(0, 0, 0, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;
