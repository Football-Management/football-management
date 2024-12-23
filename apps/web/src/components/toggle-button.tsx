'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ToggleButton() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? (
        <Sun className="text-black dark:text-white" size={22} />
      ) : (
        <Moon className="text-black dark:text-white" size={22} />
      )}
    </button>
  )
}
