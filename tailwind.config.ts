import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        amber: {
          900: '#803c04'
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
  darkMode: ["class"],
  plugins: [],
}

export default config

