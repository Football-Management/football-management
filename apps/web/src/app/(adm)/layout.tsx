import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Football Management',
  description: 'Manage your dream team',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-light_layout dark:bg-dark_layout`}
      >
        <header className="pb-6">
          <Header />
        </header>

        <main className="px-24">{children}</main>
      </body>
    </html>
  )
}
