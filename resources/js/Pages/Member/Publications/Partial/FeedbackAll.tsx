import Stars from '@/Components/Stars'
import React from 'react'
import FeedbackForm from './FeedbackForm'
import FeedbackList from './FeedbackList'

interface Props {
    publicationId: number
}

const FeedbackAll: React.FC<Props> = ({ publicationId }) => {
    return (
        <div className='space-y-10 '>
            <FeedbackForm publicationId={publicationId} />
            <FeedbackList publicationId={publicationId} />
        </div>
    )
}

export default FeedbackAll
