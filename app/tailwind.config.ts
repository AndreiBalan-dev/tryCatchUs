import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'sans-serif'],
      },
      colors: {
        primaryBackground: "#001524",
        primaryText: "#FAFAFF",
        primaryButton: "#273469",
        primaryButtonHover: "#1E2749",
      },
    },
  },
  plugins: [],
};

export default config;
