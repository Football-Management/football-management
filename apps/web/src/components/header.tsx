'use client'

import Link from 'next/link'
import ToggleButton from './toggle-button'
import BtnLogout from '@/app/(auth)/sign-in/(components)/btn-logout'

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
            <Link href="/home" className="text-black dark:text-white">
              Home
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex space-x-4">
        <ToggleButton />
        <BtnLogout />
      </div>
    </header>
  )
}
