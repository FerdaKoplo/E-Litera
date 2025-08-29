import React, { useState } from 'react'
import Label from './Label'
import Input from './Input'
import { FaStar } from 'react-icons/fa6'

interface Props {
    initialRating?: number
    onRatingChange?: (rating: number) => void
}

const Stars: React.FC<Props> = ({ initialRating, onRatingChange }) => {

    const [rating, setRating] = useState<number>(initialRating || 0)
    const [hover, setHover] = useState<number>(0)

    const handleClick = (index: number) => {
        setRating(index)
        if (onRatingChange) {
            onRatingChange(index)
        }
    }

    return (
        <>
            {Array.from({ length: 5 }, (_, index) => {
                const currentRating = index + 1
                return (
                    <Label key={index} className='inline-block'>
                        <Input
                            type='radio'
                            name='rating'
                            value={currentRating}
                            onClick={() => handleClick(currentRating)}
                            style={{ display: 'none' }}
                        />
                        <FaStar
                            className="star"
                            size={30}
                            color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(0)}
                            style={{ cursor: 'pointer' }}
                        />
                    </Label>
                )
            })}
        </>
    )
}

export default Stars
