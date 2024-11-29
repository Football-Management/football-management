import Link from 'next/link'
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
            <Link href="/finance" className="text-black dark:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="/finance" className="text-black dark:text-white">
              Financeiro
            </Link>
          </li>
        </ul>
      </nav>
      <ToggleButton />
    </header>
  )
}
