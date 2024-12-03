import Card from '@/components/card'
import { api } from '@/data/api'
import { formatCurrency } from '@/utils/formatCurrency'
import { Calendar, ChartNoAxesCombined } from 'lucide-react'
import React from 'react'

interface FinancialPredictResponse {
  nextMonthPrediction: number
  nextQuarterPrediction: number
  nextYearPrediction: number
  financialClassification: string
}

async function GetFinancialPredict(): Promise<FinancialPredictResponse> {
  const response = await api(
    'financial-predict/077c7886-2afa-4719-b675-6cacd486e207',
    {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch weekly summary')
  }

  const financialPredict: { financialPredict: FinancialPredictResponse } =
    await response.json()
  return financialPredict.financialPredict
}

export default async function FinancialPredict() {
  const data = await GetFinancialPredict()

  console.log(data)

  return (
    <Card title="Previsão Financeira">
      <div className="flex border-b border-dashed border-black dark:border-white justify-between py-4">
        <div className="flex space-x-2">
          <Calendar className="text-black dark:text-white" size={17} />
          <p className="text-sm text-black dark:text-white">
            Projeção financeira para o próximo mês
          </p>
        </div>

        <p className="text-black dark:text-white">
          Projeção: {formatCurrency(data?.nextMonthPrediction)}
        </p>
      </div>

      <div className="flex border-b border-dashed border-black dark:border-white justify-between py-4">
        <div className="flex space-x-2">
          <Calendar className="text-black dark:text-white" size={17} />
          <p className="text-sm text-black dark:text-white">
            Projeção financeira para o próximo trimestre
          </p>
        </div>

        <p className="text-black dark:text-white">
          Projeção: {formatCurrency(data?.nextQuarterPrediction)}
        </p>
      </div>
      <div className="flex border-b border-dashed border-black dark:border-white justify-between py-4">
        <div className="flex space-x-2">
          <Calendar className="text-black dark:text-white" size={17} />
          <p className="text-sm text-black dark:text-white">
            Projeção financeira para o próximo ano
          </p>
        </div>

        <p className="text-black dark:text-white">
          Projeção: {formatCurrency(data?.nextYearPrediction)}
        </p>
      </div>
      <div className="flex border-b border-dashed border-black dark:border-white justify-between py-4">
        <div className="flex space-x-2">
          <ChartNoAxesCombined
            size={17}
            className="text-black dark:text-white"
          />
          <p className="text-sm text-black dark:text-white">Tendência</p>
        </div>

        <p className="text-black dark:text-white">
          {data?.financialClassification}
        </p>
      </div>
    </Card>
  )
}
