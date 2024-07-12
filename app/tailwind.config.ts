import { text } from "stream/consumers";
import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		cursor: {
			default: 'url(/cursors/cursor-default.png), default',
			auto: 'url(/cursors/cursor-default.png), auto',
			pointer: 'url(/cursors/cursor-pointer.png), pointer',
      wait: 'url("/cursors/cursor-wait.gif"), wait',
      text: 'url("/cursors/cursor-text.png"), text',
      move: 'url("/cursors/cursor-move.png"), move',
		},
		extend: {
			fontFamily: {
				"press-start": ['"Press Start 2P"', "sans-serif"],
			},
			colors: {
				primaryBackground: "#001524",
				secondaryBackground: "#002B3C",
				primaryText: "#FAFAFF",
				secondaryText: "#000000",
				primaryButton: "#FFFD01",
				primaryButtonHover: "#E5D700",
				primaryButtonBorder: "#141414",
			},
		},
	},
	plugins: [],
};

export default config;
