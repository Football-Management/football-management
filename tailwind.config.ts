import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        amber: {
          900: '#803c04',
        },
        green: {
          500: '#26ca5e',
        },
        dark_layout: '#000000',
        light_layout: '#ffffff',
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
