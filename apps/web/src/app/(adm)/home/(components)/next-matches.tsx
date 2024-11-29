import Card from '@/components/card'
import { api } from '@/data/api'
import { MoveDownLeft, MoveUpRight, Wallet } from 'lucide-react'

interface TransactionsSummaryResponse {
  income: number
  expense: number
  balance: number
}

async function GetTransactionsSummary(): Promise<TransactionsSummaryResponse> {
  const response = await api(
    'transactions-summary/077c7886-2afa-4719-b675-6cacd486e207',
    {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch weekly summary')
  }

  const data: { transactionsSummary: TransactionsSummaryResponse } =
    await response.json()
  return data.transactionsSummary
}

export default async function NextMatches() {
  const data = await GetTransactionsSummary()

  return (
    <div className="flex space-x-2 items-stretch">
      <Card title="Entradas">
        <div className="flex justify-between items-center p-2 rounded-lg">
          <p className="text-2xl font-bold text-black dark:text-white">
            R$ {data.income.toLocaleString('pt-BR')}
          </p>
          <div className="bg-green-600 rounded-full p-3">
            <MoveUpRight size={20} />
          </div>
        </div>
      </Card>

      <Card title="Saídas">
        <div className="flex justify-between items-center p-2 rounded-lg">
          <p className="text-2xl font-bold text-black dark:text-white">
            R$ {data.expense.toLocaleString('pt-BR')}
          </p>
          <div className="bg-red-600 rounded-full p-3">
            <MoveDownLeft size={20} />
          </div>
        </div>
      </Card>

      <Card title="Receita Atual">
        <div className="flex justify-between items-center p-2 rounded-lg">
          <p className={`text-2xl font-bold text-black dark:text-white`}>
            R$ {data.balance.toLocaleString('pt-BR')}
          </p>
          <div className="rounded-full p-3">
            <Wallet className="text-black dark:text-white" size={20} />
          </div>
        </div>
      </Card>
    </div>
  )
}
