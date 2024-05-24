import Button from '@/components/button'
import Card from '@/components/card'
import { api } from '@/data/api'
import Image from 'next/image'
import { WeeklyReport } from './(components)/weekly-report'

interface ClubResponse {
  name: string
  embled: string
  assets: number
  number_players: number
  current_season: number
}

async function getTeam(): Promise<ClubResponse[]> {
  const response = await api('team', {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const team = response.json()
  return team
}

export default async function Home() {
  const [data] = await getTeam()

  const assets = data.assets.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
  })

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 md:gap-2 auto-rows-fr items-stretch">
      <div className="flex flex-col h-full">
        <Card>
          <div>
            <div className="flex flex-col items-center space-y-2">
              <Image src={data?.embled} width={90} height={90} alt="" />
              <p>{data?.name}</p>
              <Button variant="primary">Ver perfil</Button>
            </div>

            <div className="flex justify-center space-x-12 bg-white dark:bg-black p-2 pt-4">
              <div>
                <p className="text-center text-sm text-gray-400">Patrimônio</p>
                <p className="text-center font-semibold">{assets}</p>
              </div>

              <div>
                <p className="text-center text-sm text-gray-400">Elenco</p>
                <p className="text-center font-semibold">
                  {data?.number_players}
                </p>
              </div>

              <div>
                <p className="text-center text-sm text-gray-400">Temporada</p>
                <p className="text-center font-semibold">
                  {data?.current_season}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-col">
        <WeeklyReport />
      </div>

      <div className="md:col-span-2 bg-red-600">...</div>
    </section>
  )
}
