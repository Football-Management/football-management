import React, { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function Card({ children, title, description }: CardProps) {
  return (
    <div
      className="bg-white dark:bg-black 
    shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] 
    py-4 px-6 w-full"
    >
      <p className="font-semibold">{title}</p>
      {children}
    </div>
  )
}
