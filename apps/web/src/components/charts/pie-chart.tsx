'use client'
import { useState } from 'react'
import {
  PieChart as PieChartWrapper,
  Pie,
  Cell,
  Tooltip,
  Label,
  TooltipProps,
  ResponsiveContainer,
} from 'recharts'

interface PieChartProps {
  width: number
  height: number
}

interface PieData {
  name: string
  value: number
}

const data: PieData[] = [
  { name: 'Transferência', value: 400 },
  { name: 'Salários', value: 300 },
  { name: 'Receita bilheteria', value: 300 },
  { name: 'Venda de camisas', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function PieChart({ width, height }: PieChartProps) {
  const [activeValue, setActiveValue] = useState('')

  const handleMouseEnter = (data: any, index: number) => {
    setActiveValue(data.value)
  }

  const CustomLabel: React.FC<{ viewBox: any }> = ({ viewBox }) => {
    const { cx, cy } = viewBox
    return (
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-black dark:fill-white"
      >
        {activeValue}
      </text>
    )
  }

  const CustomTooltip: React.FC<TooltipProps<any, string>> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-1 text-sm border border-gray-300 rounded-md shadow-lg relative top-5 left-20">
          <p className="font-semibold dark:text-black">{label}</p>
          <p className="dark:text-black">{payload[0].name}</p>
        </div>
      )
    }

    return null
  }

  return (
    <div className="w-20 h-20">
      <ResponsiveContainer>
        <PieChartWrapper>
          <Pie
            data={data}
            innerRadius={27}
            outerRadius={37}
            paddingAngle={0.5}
            maxRadius={60}
            dataKey="value"
            onMouseEnter={handleMouseEnter}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

            <Label
              content={<CustomLabel viewBox={undefined} />}
              position="center"
            />
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChartWrapper>
      </ResponsiveContainer>
    </div>
  )
}
