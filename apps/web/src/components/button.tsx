import React from 'react'
import { Button as ButtonShadcnUi } from '@/components/ui/button'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  variant?:
    | 'secondary'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'ghost'
    | 'link'
}

export default function Button({ title, variant, ...rest }: ButtonProps) {
  return (
    <ButtonShadcnUi variant={variant} className="cursor-pointer" {...rest}>
      {title}
    </ButtonShadcnUi>
  )
}
