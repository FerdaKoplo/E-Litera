import React from 'react'

interface Props {
    children: React.ReactNode
    type?: "submit" | "button" | "reset" | undefined
    process: boolean
    className? : string
}

const Button : React.FC<Props> = ( {children, process, className = '', type} ) => {
  return (
    <button disabled={process} type={type} className={`px-2 py-2 bg-black  rounded-lg font-medium ${className}`}>
        {children}
    </button>
  )
}

export default Button
