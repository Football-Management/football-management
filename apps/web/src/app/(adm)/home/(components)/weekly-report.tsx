import Card from '@/components/card'
import { PieChart } from '@/components/charts/pie-chart'

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

// const DownIcon: React.FC<IconProps> = ({ className }) => (
//   <svg
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//     xmlnsXlink="http://www.w3.org/1999/xlink"
//     aria-hidden="true"
//     role="img"
//     width="1em"
//     height="1em"
//     viewBox="0 0 24 24"
//   >
//     <path
//       fill="currentColor"
//       d="M5 6.25a.75.75 0 0 0-.488 1.32l7 6c.28.24.695.24.976 0l7-6A.75.75 0 0 0 19 6.25z"
//       opacity=".5"
//     />
//     <path
//       fill="currentColor"
//       fillRule="evenodd"
//       d="M4.43 10.512a.75.75 0 0 1 1.058-.081L12 16.012l6.512-5.581a.75.75 0 1 1 .976 1.139l-7 6a.75.75 0 0 1-.976 0l-7-6a.75.75 0 0 1-.081-1.058"
//       clipRule="evenodd"
//     />
//   </svg>
// )

export function WeeklyReport() {
  return (
    <Card title="Resumo semanal">
      <div className="flex justify-between">
        <section className="flex flex-col justify-center gap-6">
          <div className="flex items-center">
            <UpIcon className="text-green-500 fill-current w-7 h-7" />
            <p className="text-sm">+ 1,7%</p>
          </div>
          <p className="font-semibold text-2xl">2.000.000,00</p>
        </section>

        {/* <section className="relative">
          <PieChart width={130} height={130} />
        </section> */}
      </div>
    </Card>
  )
}
