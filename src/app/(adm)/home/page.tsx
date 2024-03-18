import Link from "next/link"

export default function Home() {
  return (
    <header className="bg-green-500 h-16 flex justify-between items-center px-24">
      <nav>
        <ul className="flex justify-between text-white list-none space-x-2">
          <li>
            <p>menu</p>
          </li>
          <li>
            <Link href="/finances">Financeiro</Link>
          </li>
          <li>
            <Link href="/players">Atletas</Link>
          </li>
        </ul>
      </nav>

      <h1>Football Management</h1>

      <p>search</p>
    </header>
  )
}
