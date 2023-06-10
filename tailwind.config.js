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
  theme: {
    extend: {
      backgroundColor: {
        app: '#f8f6f6',
        details: '#d8d8ff',
      },
      width: {
        sidebar: '18.75rem',
        sidebarSmall: '4rem',
      },
      maxWidth: {
        sidebar: '18.75rem',
        sidebarSmall: '4rem',
      },
      minWidth: {
        sidebar: '18.75rem',
        sidebarSmall: '4rem',
      },
      borderColor: {
        sidebar: '#cfcfcf',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus'])
    }),
  ],
}
