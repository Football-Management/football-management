import Link from 'next/link'
import { Menu } from 'lucide-react'
import ToggleButton from './toggle-button'

export default function Header() {
  return (
    <header
      className="bg-light_layout dark:bg-dark_layout h-16
     flex justify-between items-center px-24 border-b-2 dark:border-b-gray-500"
      suppressHydrationWarning
    >
      <nav>
        <ul className="flex justify-between  list-none space-x-2">
          <li>
            <Menu />
          </li>
          <li>
            <Link href="/finances" className="text-black dark:text-white">
              Financeiro
            </Link>
          </li>
          <li>
            <Link href="/players" className="text-black dark:text-white">
              Atletas
            </Link>
          </li>
        </ul>
      </nav>
      <ToggleButton />
    </header>
  )
}
