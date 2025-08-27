import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
    children: React.ReactNode
    type?: "submit" | "button" | "reset" | undefined
    process?: boolean
    className? : string
}

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

const Button : React.FC<Props> = ( {children, process, className = '', type, ...props} ) => {
  return (
    <button {...props} disabled={process} type={type} className={cn('px-2 py-2 bg-black text-white font-medium rounded-lg', className)}>
        {children}
    </button>
  )
}

export default Button
