import type { Config } from 'tailwindcss'

const config: Omit<Config, 'content'> = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        amber: {
          200: '#f3d28a',
          400: '#dcb664',
          900: '#803c04',
        },
        green: {
          500: '#26ca5e',
          600: '#1e6515',
          700: '#0f4a09',
        },
        red: {
          400: '#d00307',
        },
        dark_layout: '#000',
        light_layout: '#eee',
        bg_primary_light: '#fff',
        bg_primary_dark: '#1a1a1a',
        brown: {
          700: '#493d0d',
        },
        gray: {
          400: '#999999',
          500: '#2b2b2b',
        },
      },
      fontFamily: {
        sans: 'var(--font-inter)',
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))',
      },
    },
  },
  darkMode: ['class'],
  plugins: [],
}

export default config
