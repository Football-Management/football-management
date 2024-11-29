import Button from '@/components/button'
import Card from '@/components/card'
import Image from 'next/image'
import { WeeklyReport } from './(components)/weekly-report'
import NextMatches from './(components)/next-matches'
import LogoAnapolis from '../../../../public/logo-anapolis-go.png'
import { MonthlyReport } from './(components)/monthly-report'
import FinancialPrediction from './(components)/financial-prediction'

export default async function Home() {
  return (
    <section>
      <div className="pb-2">
        <NextMatches />
      </div>
      <div className="grid grid-flow-col gap-2 items-stretch h-auto">
        <div className="row-span-3">
          <Card>
            <div className="flex flex-col items-center space-y-2">
              <Image src={LogoAnapolis} width={90} height={90} alt="" />
              <p className="text-black dark:text-white">
                Anápolis Futebol Clube
              </p>
              <Button variant="primary">Ver perfil</Button>
            </div>

            <div className="flex justify-center space-x-12 bg_primary_light dark:bg_primary_dark p-2 pt-4">
              <div>
                <p className="text-center text-sm text-gray-400">
                  Patrimônio atual
                </p>
                <p className="text-center font-semibold text-black dark:text-white">
                  2.000.000,00
                </p>
              </div>

              <div>
                <p className="text-center text-sm text-gray-400">Temporada</p>
                <p className="text-center font-semibold text-black dark:text-white">
                  2024
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-2">
          <WeeklyReport />
        </div>
        <div className="row-span-2 col-span-2">
          <MonthlyReport />
        </div>
      </div>

      <div className="pt-2">
        <FinancialPrediction />
      </div>
    </section>
  )
}
