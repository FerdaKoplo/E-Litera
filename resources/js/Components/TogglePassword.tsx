import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import Button from './Button'

interface TogglePasswordProps {
    showPassword: boolean
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
}

const TogglePassword: React.FC<TogglePasswordProps> = ({ setShowPassword, showPassword }) => {


    return (
        <Button className='bg-transparent text-violet-500' type='button' onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
        </Button>
    )
}

export default TogglePassword
