import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string
    className?: string
    isFocused?: boolean
}

const Input: React.FC<Props> = ({ type = 'text', isFocused = false, className, ...props }) => {
    const input = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isFocused) {
            input.current?.focus();
        }
    }, [isFocused])

    return (
        <input
            {...props}
            type={type}
            ref={input}
            className={clsx('border-gray-300 shadow-sm', 'rounded-md',className)}
        />
    )
}

export default Input
