import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        amber: {
          400: '#f3d28a',
          900: '#803c04',
        },
        green: {
          500: '#26ca5e',
        },
        red: {
          400: '#d00307',
        },
        dark_layout: '#000',
        light_layout: '#eee',
        bg_primary_light: '#fff',
        bg_primary_dark: '#1a1a1a',
        gray: {
          400: '#999999',
          500: '#2b2b2b',
        },
      },
      fontFamily: {
        sans: 'var(--font-inter)',
      },
      gridTemplateRows: {
        app: 'min-content max-content',
      },
    },
  },
  darkMode: ['class'],
  plugins: [],
}

export default config
