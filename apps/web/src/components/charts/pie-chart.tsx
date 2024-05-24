'use client'
import { useState } from 'react'
import {
  PieChart as PieChartWrapper,
  Pie,
  Cell,
  Tooltip,
  Label,
  TooltipProps,
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
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
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
        fill="#000"
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
        <div className="bg-white p-1 text-sm border border-gray-300 rounded-md shadow-lg top-8">
          <p className="font-semibold">{label}</p>
          <p>
            <strong>Value:</strong> {payload[0].value}
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <PieChartWrapper width={width} height={height}>
      <Pie
        data={data}
        innerRadius={40}
        outerRadius={60}
        paddingAngle={0.5}
        maxRadius={60}
        dataKey="value"
        onMouseEnter={handleMouseEnter}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}

        <Label
          content={<CustomLabel viewBox={undefined} />}
          position="center"
        />
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChartWrapper>
  )
}
