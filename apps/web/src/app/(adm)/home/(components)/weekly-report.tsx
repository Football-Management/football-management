import Card from '@/components/card'
import { PieChart } from '@/components/charts/pie-chart'
import { api } from '@/data/api'
import { formatCurrency } from '@/utils/formatCurrency'

interface IconProps {
  className?: string
}

const UpIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="40"
    height="40"
  >
    <path
      fill="currentColor"
      d="M5 17.75a.75.75 0 0 1-.488-1.32l7-6a.75.75 0 0 1 .976 0l7 6A.75.75 0 0 1 19 17.75z"
      opacity=".5"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.43 13.488a.75.75 0 0 0 1.058.081L12 7.988l6.512 5.581a.75.75 0 1 0 .976-1.138l-7-6a.75.75 0 0 0-.976 0l-7 6a.75.75 0 0 0-.081 1.057"
      clipRule="evenodd"
    />
  </svg>
)

const DownIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M5 6.25a.75.75 0 0 0-.488 1.32l7 6c.28.24.695.24.976 0l7-6A.75.75 0 0 0 19 6.25z"
      opacity=".5"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.43 10.512a.75.75 0 0 1 1.058-.081L12 16.012l6.512-5.581a.75.75 0 1 1 .976 1.139l-7 6a.75.75 0 0 1-.976 0l-7-6a.75.75 0 0 1-.081-1.058"
      clipRule="evenodd"
    />
  </svg>
)

interface WeeklySummaryResponse {
  totalIncome: number
  totalExpense: number
  balance: number
  percentageChange: number
  topCategories: { category: string; amount: number }[]
}

async function GetWeeklySummary(): Promise<WeeklySummaryResponse> {
  const response = await api(
    'weekly-summary/077c7886-2afa-4719-b675-6cacd486e207',
    {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch weekly summary')
  }

  const team: { weeklySummary: WeeklySummaryResponse } = await response.json()
  return team.weeklySummary
}

export async function WeeklyReport() {
  const data = await GetWeeklySummary()

  const pieData = data?.topCategories?.map((category) => {
    return { name: category.category, value: category.amount }
  })

  return (
    <Card>
      <div className="flex justify-between">
        <section className="flex flex-col gap-2">
          <p className="font-semibold text-black dark:text-white">
            Resumo Semanal
          </p>

          <div className="flex items-center">
            {data?.percentageChange >= 0 ? (
              <UpIcon className="text-green-500 fill-current w-7 h-7" />
            ) : (
              <DownIcon className="text-red-500 fill-current w-7 h-7" />
            )}
            <p className="text-sm text-black dark:text-white">
              {data?.percentageChange}%
            </p>
          </div>
          <p className="font-semibold text-2xl text-black dark:text-white">
            {formatCurrency(data?.balance)}
          </p>
        </section>

        <section className="justify-start">
          {pieData && <PieChart width={200} height={200} data={pieData} />}
        </section>
      </div>
    </Card>
  )
}
