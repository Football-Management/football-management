import { api } from '@/data/api'
import Image from 'next/image'

interface ClubResponse {
  name: string
  embled: string
}

async function getClub(): Promise<ClubResponse[]> {
  const response = await api('user', {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const club = response.json()
  return club
}

export default async function Home() {
  const [data] = await getClub()

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center items-center">
        <Image src={data?.embled} width={100} height={100} alt="" />
        <p>{data?.name}</p>
        <button>Ver perfil</button>
        <div className="bg-white dark:bg-black shadow-lg shadow-slate-900/20 shadow-b-2 shadow-r-[3px]-shadow-spread-2 p-2">
          <p>
            Patrimônio
            <span>$ 20.000.000</span>
          </p>
        </div>
      </div>
    </section>
  )
}
