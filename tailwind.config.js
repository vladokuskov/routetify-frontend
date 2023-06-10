/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {},
      color: {},
      fontFamily: {
        roboto: ['var(--font-roboto)'],
      },
      screens: {
        sm: '650px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
b
