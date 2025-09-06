import React from 'react'

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement>{
    forInput?: string;
    value?: string;
    className?: string;
}


const Label : React.FC<Props> = ( {forInput, value, children, className = '', ...props} ) => {
  return (
    <label htmlFor={forInput} className={`block font-semibold text-sm  ${className}`} {...props}>
        {value ?? children}
    </label>
  )
}

export default Label
