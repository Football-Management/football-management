import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
  variant?: 'primary' | 'secondary'
}

export default function Button({
  children,
  variant = 'primary',
  className,
  ...rest
}: ButtonProps) {
  const baseStyles = `py-2 px-4 text-xs font-semibold rounded uppercase
    shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] focus:outline-none focus:shadow-outline
    `
  const variantStyles = {
    primary: 'bg-white hover:bg-slate-50 text-black',
    secondary: 'bg-green-500 hover:bg-green-600 text-white',
  }

  const buttonClass = `${baseStyles} ${variantStyles[variant]} ${className}`
  return (
    <button className={buttonClass} {...rest}>
      {children}
      <div className="font-semibold bg-slate-50-50"></div>
    </button>
  )
}
