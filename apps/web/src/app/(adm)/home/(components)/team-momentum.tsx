import Card from '@/components/card'
import Circle from '@/components/circle'
import React from 'react'

export function TeamMomentum() {
  return (
    <Card title="Momento do time">
      <div className="flex justify-between mt-5">
        <div>
          <p>Últimas cinco: </p>
          <div className="flex gap-1">
            <Circle variant="green" />
            <Circle variant="green" />
            <Circle variant="green" />
            <Circle variant="red" />
            <Circle variant="green" />
          </div>
        </div>
        <div>...</div>
      </div>
    </Card>
  )
}
