import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa6'

interface Props {
    rating: number
    size?: number
    color?: string
}

const DisplayStars: React.FC<Props> = ({ rating, color, size }) => {

    return (
        <>
            {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                    className='inline-block'
                    key={index}
                    size={size}
                    color={index + 1 <= rating ? color : "#e4e5e9"}
                />
            ))}
        </>
    )
}

export default DisplayStars
