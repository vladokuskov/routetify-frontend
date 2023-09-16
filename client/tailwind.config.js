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
    container: {
      center: true,
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundColor: {
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
      screens: {
        'max-sm': { raw: 'not all and (min-width: 640px)' },
        'max-hsm': { raw: '(max-height: 680px)' },
        'max-dsm': { raw: '(max-height: 940px)' },
      },
      colors: {
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        title: 'hsl(var(--title))',
        paragraph: 'hsl(var(--paragraph))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          muted: 'hsl(var(--primary-muted))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        map: {
          DEFAULT: 'hsl(var(--map))',
          border: 'hsl(var(--map-border))',
          foreground: 'hsl(var(--map-foreground))',
        },
        input: {
          DEFAULT: 'hsl(var(--input))',
          map: 'hsl(var(--input-map))',
          'map-foreground': 'hsl(var(--input-map-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'move-right': {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(200%)' },
          '50%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'move-right': 'move-right 0.5s backwards',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus-visible'])
    }),
  ],
}
