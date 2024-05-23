import Card from '@/components/card'
import { PieChart } from '@/components/charts/pie-chart'

export function WeeklyReport() {
  return (
    <Card title="Resumo semanal">
      <PieChart width={160} height={200} />
    </Card>
  )
}
