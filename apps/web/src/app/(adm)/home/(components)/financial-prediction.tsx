import Card from '@/components/card'
import { Calendar, ChartNoAxesCombined } from 'lucide-react'
import React from 'react'

export default function FinancialPrediction() {
  return (
    <Card title="Previsão Financeira">
      <div className="flex border-b border-dashed border-black dark:border-white justify-between py-4">
        <div className="flex space-x-2">
          <Calendar className="text-black dark:text-white" size={17} />
          <p className="text-sm text-black dark:text-white">
            Projeção financeira para o próximo mês, baseada no desempenho
            recente.
          </p>
        </div>

        <p className="text-black dark:text-white">Projeção: +R$ 150.000</p>
      </div>

      <div className="flex border-b border-dashed border-black dark:border-white justify-between py-4">
        <div className="flex space-x-2">
          <Calendar className="text-black dark:text-white" size={17} />
          <p className="text-sm text-black dark:text-white">
            Projeção financeira para o trimestre, baseada no desempenho recente.
          </p>
        </div>

        <p className="text-black dark:text-white">Projeção: +R$ 750.000</p>
      </div>
      <div className="flex border-b border-dashed border-black dark:border-white justify-between py-4">
        <div className="flex space-x-2">
          <ChartNoAxesCombined
            size={17}
            className="text-black dark:text-white"
          />
          <p className="text-sm text-black dark:text-white">Tendência</p>
        </div>

        <p className="text-black dark:text-white">Excelente</p>
      </div>
    </Card>
  )
}
