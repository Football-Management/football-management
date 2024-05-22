'use client'
import { PieChart as PieChartWrapper, Pie, Cell } from 'recharts'

interface PieChartProps {
  width: number
  height: number
}

interface PieData {
  name: string
  value: number
}

const data: PieData[] = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function PieChart({ width, height }: PieChartProps) {
  return (
    <PieChartWrapper width={width} height={height}>
      <Pie
        data={data}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={0.5}
        maxRadius={60}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChartWrapper>
  )
}
