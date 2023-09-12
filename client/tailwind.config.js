/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        moveRight: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(200%)' },
          '50%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        moveRight: 'moveRight 0.5s backwards',
      },

      backgroundColor: {
        app: '#f8f6f6',
        details: '#d8d8ff',
      },
      width: {
        sidebar: '19.75rem',
        sidebarSmall: '4rem',
      },
      maxWidth: {
        sidebar: '19.75rem',
        sidebarSmall: '4rem',
      },
      minWidth: {
        sidebar: '18.75rem',
        sidebarSmall: '4rem',
      },
      borderColor: {
        sidebar: '#cfcfcf',
      },
      screens: {
        'max-sm': { raw: 'not all and (min-width: 640px)' },
        'max-hsm': { raw: '(max-height: 680px)' },
        'max-dsm': { raw: '(max-height: 940px)' },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus-visible'])
    }),
  ],
}
