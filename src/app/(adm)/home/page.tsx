'use client'
import Link from "next/link"
import { Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

export default function Home() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-green-500 dark:bg-gray-800 h-16 flex justify-between items-center px-24">

      <nav>
        <ul className="flex justify-between  list-none space-x-2">
          <li>
            <Menu />
          </li>
          <li>
            <Link href="/finances" className="text-amber-900 dark:text-white">Financeiro</Link>
          </li>
          <li>
            <Link href="/players" className="text-amber-900 dark:text-white">Atletas</Link>
          </li>
        </ul>
      </nav>

      <h1>Football Management</h1>

      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'ligth' ? <Sun /> : <Moon />}
      </button>
    </header>
  )
}
