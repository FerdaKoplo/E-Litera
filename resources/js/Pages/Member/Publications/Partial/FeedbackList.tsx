import DisplayStars from '@/Components/DisplayStars'
import Profile from '@/Components/Profile'
import Stars from '@/Components/Stars'
import { Card, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa6'

interface Props {
    publicationId: number
}


const FeedbackList: React.FC<Props> = ({ publicationId }) => {

    const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const res = await axios.get(`/publications/${publicationId}/feedback`)
                setFeedbacks(res.data.data)
            } catch (err: any) {
                setError(err.response?.data?.message || 'Something went wrong')
            } finally {
                setLoading(false)
            }
        }

        fetchFeedbacks()
    }, [publicationId])

    if (loading) return <p>Loading feedbacks...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <Card className="shadow-sm border rounded-lg">
            <CardHeader className='flex flex-col'>
                <CardTitle className="text-xl font-semibold">Feedback</CardTitle>
                <CardDescription>
                    See what others are saying about this publication
                </CardDescription>
            </CardHeader>

            <div className="p-4">
                {feedbacks.length === 0 ? (
                    <p className="text-gray-500 text-sm">No feedback found.</p>
                ) : (
                    <div className="space-y-4">
                        {feedbacks.map((fb) => (
                            <div
                                key={fb.id}
                                className="p-4 border rounded-lg shadow-sm space-y-5  "
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-whte  text-black">
                                        <Profile fallback={fb.user?.name} />
                                    </div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                                        {fb.user?.name}
                                    </p>
                                </div>
                                <div className='flex justify-between'>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {fb.review}
                                    </p>
                                    <div>
                                        <DisplayStars key={fb.id} color='#ffc107' rating={fb.rating} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    )
}

export default FeedbackList
