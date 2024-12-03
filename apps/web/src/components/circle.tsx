import { Check, Minus, X } from 'lucide-react'
import React from 'react'

interface CircleProps {
  variant: 'red' | 'neutral' | 'green'
}

export default function Circle({ variant = 'green' }: CircleProps) {
  const variantStyles = {
    red: 'bg-red-500 hover:bg-red-700',
    neutral: 'bg-gray-300 hover:bg-gray-400',
    green: 'bg-green-500 hover:bg-green-600',
  }

  const circleClass = `${variantStyles[variant]}`
  return (
    <div
      className={`flex justify-center items-center rounded-full h-5 w-5 ${circleClass}`}
    >
      <i>
        {variant === 'green' && <Check className="text-white" size={12} />}
        {variant === 'neutral' && <Minus className="text-white" size={12} />}
        {variant === 'red' && <X className="text-white" size={12} />}
      </i>
    </div>
  )
}
