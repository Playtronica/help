import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "Segoe UI",
          "Roboto",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "IBM Plex Mono",
          "ui-monospace",
          "SF Mono",
          "Menlo",
          "monospace",
        ],
      },
      colors: {
        // F1 tokens
        bg: "#fdfcfa",
        ink: "#15161b",
        "ink-soft": "#5a5d6a",
        rule: "#1a1a1a",
        "rule-soft": "#e9e6df",
        accent: "#4a5cd9",
        "accent-soft": "#eef0ff",
        gold: "#b88a47",
        hl: "#fff9e9",
        soft: "#f7f6f1",
        // legacy aliases kept for older components
        ink2: "#3949ab",
      },
      maxWidth: { reading: "64ch" },
      boxShadow: {
        block: "4px 4px 0 #1a1a1a",
        "block-sm": "3px 3px 0 #1a1a1a",
      },
    },
  },
  plugins: [],
};
export default config;
