import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#070708",
        foreground: "#F4F4F5",
        accent: "#5EEAD4",
        muted: "#A1A1AA",
        card: "#111113",
        border: "#27272A",
        dark: "#070708",
        "dark-muted": "#71717A",
        surface: "#0C0C0E",
        glow: "#2DD4BF",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "80rem",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "hero-glow":
          "radial-gradient(ellipse 70% 50% at 70% 40%, rgba(94,234,212,0.14), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(147,197,253,0.08), transparent 55%)",
      },
      backgroundSize: {
        grid: "64px 64px",
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
