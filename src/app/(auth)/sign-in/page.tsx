import Link from "next/link";

export default function SignIn() {
  return (
    <main className="flex justify-center items-center h-screen">
      <Link href='/home'>
        <button>Acessar</button>
      </Link>
    </main>
  );
}
