import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'
import Label from './Label'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    className?: string
    isFocused?: boolean
}

const Input: React.FC<Props> = ({ error, label, isFocused = false, className, ...props }) => {
    const input = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isFocused) {
            input.current?.focus();
        }
    }, [isFocused])

    return (
        <div className="flex flex-col gap-1">
            {label && <Label className="text-sm font-medium text-gray-700">{label}</Label>}
            <input
                {...props}
                ref={input}
                className={clsx(
                    'border-gray-300 shadow-sm rounded-md focus:ring-1 focus:ring-violet-500 focus:border-violet-500',
                    className,
                    error && 'border-red-500'
                )}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    )
}

export default Input
