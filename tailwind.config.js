import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			backgroundImage: {
				"custom-bg-dark": "url('/dark-bg.jpg')",
				"custom-bg-light": "url('/light-bg.jpg')",
			},
			fontFamily: {
				sans: ["var(--font-sans)"],
				mono: ["var(--font-roboto-mono)"],
			},
		},
	},
	darkMode: "class",
	plugins: [nextui(), require("tailwindcss-animate")],
};

