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
      <div className="md:col-span-1 md:w-1/4">
        <div className="flex flex-col items-center">
          <Image src={data?.embled} width={70} height={70} alt="" />
          <p>{data?.name}</p>
          <button>Ver perfil</button>
        </div>
   
        <div className="bg-white dark:bg-black p-2 pt-4">
          <p className="text-center">
            Patrimônio
            <span>$ 20.000.000</span>
          </p>
        </div>
      </div>
      <div className="md:col-span-1 md:w-3/4">grid-2</div>
    </section>
  )
}
