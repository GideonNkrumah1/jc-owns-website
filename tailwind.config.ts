import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FAF4EC",
          50: "#FFFDFB",
          100: "#FAF4EC",
          200: "#F3E7D9",
          300: "#EAD8C2",
        },
        charcoal: {
          DEFAULT: "#211C19",
          700: "#332B26",
          800: "#241E1B",
          900: "#171310",
        },
        forest: {
          50: "#EAF1EC",
          100: "#CFE0D5",
          200: "#A3C3AF",
          300: "#7FA98D",
          400: "#4C8763",
          500: "#2F6B45",
          600: "#215135",
          700: "#173D27",
          800: "#102C1C",
          900: "#0A2013",
        },
        burgundy: {
          50: "#F5EAED",
          100: "#E3C6CE",
          200: "#C68FA0",
          300: "#9C4A63",
          400: "#832F4C",
          500: "#711D3B",
          600: "#5A1730",
          700: "#440F25",
          800: "#340A1B",
          900: "#230612",
        },
        gold: {
          50: "#FBF4E4",
          100: "#F2E1B8",
          200: "#E6CA8A",
          300: "#D9B96A",
          400: "#C6A24E",
          500: "#B8923F",
          600: "#96762F",
          700: "#725923",
          800: "#544019",
        },
        leaf: {
          400: "#579B4F",
          500: "#3C8B3C",
          600: "#2E6E2E",
        },
      },
      fontFamily: {
        serif: [
          "var(--font-fraunces)",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "1280px",
        prose: "68ch",
      },
      letterSpacing: {
        wide: "0.04em",
        widest: "0.14em",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(23, 19, 16, 0.06), 0 8px 24px -12px rgba(23, 19, 16, 0.12)",
        card: "0 1px 2px rgba(23, 19, 16, 0.05), 0 12px 32px -16px rgba(23, 19, 16, 0.16)",
      },
      transitionTimingFunction: {
        elegant: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
export default config;
