import Stars from '@/Components/Stars'
import React, { useState } from 'react'
import FeedbackForm from './FeedbackForm'
import FeedbackList from './FeedbackList'

interface Props {
    publicationId: number
}

const FeedbackAll: React.FC<Props> = ({ publicationId }) => {

    const [ refreshKey, setRefreshKey ] = useState<number>(0)

    return (
        <div className='space-y-10 '>
            <FeedbackForm publicationId={publicationId} onSubmitted={() => setRefreshKey(prev => prev + 1)}/>
            <FeedbackList publicationId={publicationId} refreshKey={refreshKey}/>
        </div>
    )
}

export default FeedbackAll
