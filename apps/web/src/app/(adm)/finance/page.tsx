import * as React from 'react'
import { useForm } from 'react-hook-form'
import Card from '@/components/card'
import Input from '@/components/input'
import { z } from 'zod'
import { yupResolver } from '@hookform/resolvers/yup'

const financeSchema = z.object({
  amount: z.string(),
})

export const financeDefaultValues = {
  amount: '',
}

export default function Finance() {
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(financeSchema),
    defaultValues: financeDefaultValues,
  })

  return (
    <Card title="Nova Transação">
      <div className="pb-2">
        <Input control={control} name="amount" label="Valor" errors={errors} />
      </div>
    </Card>
  )
}
