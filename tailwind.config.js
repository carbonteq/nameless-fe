import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg-dark': "url('/dark-bg.jpg')",
        'custom-bg-light': "url('/light-bg.jpg')",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
