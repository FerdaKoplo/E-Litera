import React, { useEffect, useRef } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string
    className?: string
    isFocused: boolean
}

const Input: React.FC<Props> = ({ type = 'text', isFocused = false, className = '', ...props }) => {
    const input = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isFocused) {
            input.current?.focus();
        }
    }, [isFocused])

    return (
        <input {...props}
            type={type}
            ref={input}
            className={`border-gray-300 focus:border-black focus:ring-black rounded-md shadow-sm ${className}`}
        />
    )
}

export default Input
