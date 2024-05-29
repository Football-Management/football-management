import Button from '@/components/button'
import Card from '@/components/card'
import { api } from '@/data/api'
import Image from 'next/image'
import { WeeklyReport } from './(components)/weekly-report'
import { PlayerStatus } from './(components)/player-status'
import { TeamMomentum } from './(components)/team-momentum'
import NextMatches from './(components)/next-matches'

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
    <section>
      <div className="pb-2">
        <NextMatches />
      </div>
      <div className="grid grid-flow-col gap-2 items-stretch h-auto">
        <div className="row-span-3">
          <Card>
            <div className="flex flex-col items-center space-y-2">
              <Image src={data?.embled} width={90} height={90} alt="" />
              <p>{data?.name}</p>
              <Button variant="primary">Ver perfil</Button>
            </div>

            <div className="flex justify-center space-x-12 bg_primary_light dark:bg_primary_dark p-2 pt-4">
              <div>
                <p className="text-center text-sm text-gray-400">
                  Patrimônio atual
                </p>
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
          </Card>
        </div>
        <div className="col-span-2">
          <WeeklyReport />
        </div>
        <div className="row-span-2 col-span-2">
          <TeamMomentum />
        </div>
      </div>

      <div className="pt-2">
        <PlayerStatus />
      </div>
    </section>
  )
}
