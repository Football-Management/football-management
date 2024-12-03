'use client'

import { formatDecimalNumber } from '@/utils/formatCurrency'
import { truncateText } from '@/utils/truncateText'
import { useState, useEffect } from 'react'
import {
  PieChart as PieChartWrapper,
  Pie,
  Cell,
  Tooltip,
  Label,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'

interface PieData {
  name: string
  value: number
}

interface PieChartProps {
  width?: number
  height?: number
  data: PieData[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function PieChart({ data, width = 200, height = 200 }: PieChartProps) {
  const [activeValue, setActiveValue] = useState<number | null>(null)
  const [activeName, setActiveName] = useState<string | null>(null)
  const [initialValue, setInitialValue] = useState<{
    name: string
    value: number
  } | null>(null)

  useEffect(() => {
    const maxItem = data.reduce(
      (prev, current) => (current.value > prev.value ? current : prev),
      data[0],
    )
    setInitialValue(maxItem)
  }, [data])

  const handleMouseEnter = (entry: PieData) => {
    setActiveValue(entry.value)
    setActiveName(entry.name)
  }

  const handleMouseLeave = () => {
    setActiveValue(null)
    setActiveName(null)
  }

  const CustomLabel: React.FC<{ viewBox?: any }> = ({ viewBox }) => {
    const { cx, cy } = viewBox || {}
    const nameToShow = truncateText(
      activeName !== null ? activeName : initialValue?.name || '',
      9,
    )
    const valueToShow = formatDecimalNumber(
      activeValue !== null ? activeValue : initialValue?.value || 0,
    )

    return (
      <>
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-black dark:fill-white font-semibold text-xs"
        >
          {nameToShow}
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-black dark:fill-white text-xs"
        >
          {valueToShow}
        </text>
      </>
    )
  }

  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
  }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload
      return (
        <div className="absolute bg-white p-2 text-sm border border-gray-300 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600 -translate-x-full translate-y-1/2">
          <p className="font-semibold text-gray-800 dark:text-white">{name}</p>
          <p className="text-gray-600 dark:text-gray-300">Valor: {value}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div
      className="flex items-center justify-center"
      style={{ width: 100, height: 100 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChartWrapper>
          <Pie
            data={data}
            innerRadius={width / 5}
            outerRadius={width / 4}
            paddingAngle={5}
            dataKey="value"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <Label content={<CustomLabel />} position="center" />
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChartWrapper>
      </ResponsiveContainer>
    </div>
  )
}
