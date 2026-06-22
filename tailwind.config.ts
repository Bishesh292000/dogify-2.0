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
          blue: "#1E3A8A",
          cyan: "#06B6D4",
          green: "#22C55E",
          ink: "#0F172A",
          cloud: "#F8FAFC"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 90px rgba(6, 182, 212, 0.25)",
        premium: "0 28px 80px rgba(15, 23, 42, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
