import Button from '@/Components/Button'
import Label from '@/Components/Label'
import Stars from '@/Components/Stars'
import { Card, CardDescription, CardTitle } from '@/Components/ui/card'
import { Textarea } from '@/Components/ui/textarea'
import { useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Props {
    publicationId: number
}

const FeedbackForm: React.FC<Props> = ({ publicationId }) => {

    const [showForm, setShowForm] = useState<boolean>(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        publication_id: publicationId,
        review: '',
        rating: ''
    })
    const { props } = usePage<{ flash: { success?: string, error?: string } }>()

    const handleRatingChange = (value: number) => {
        setData('rating', value.toString())
        setShowForm(true)
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        post(route('member.feedback.store'))
    }
    useEffect(() => {
        if (props.flash.success) toast.success(props.flash.success)
        if (props.flash.error) toast.error(props.flash.error)
    }, [])

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
            <div className='flex items-center justify-center'>
                <Stars initialRating={Number(data.rating)} onRatingChange={handleRatingChange} />
            </div>

            <div
                className={`flex flex-col gap-2 transition-all duration-500 ease-in-out overflow-hidden ${showForm
                    ? 'max-h-[400px] opacity-100 translate-y-0'
                    : 'max-h-0 opacity-0 -translate-y-3'
                    }`}
            >
                <div className="mt-4 space-y-4">
                    <Label htmlFor="review" value="Your Review" />
                    <Textarea
                        name="review"
                        placeholder="Share your thoughts..."
                        className="resize-none h-32 rounded-xl border-violet-200 focus:ring-2 focus:ring-violet-300 focus-visible:ring-violet-300"
                        value={data.review}
                        onChange={(e) => setData('review', e.target.value)}
                    />
                    {errors.review && (
                        <p className="text-sm text-red-500 mt-1">{errors.review}</p>
                    )}
                </div>

                <Button
                    disabled={processing}
                    className={`mt-4 w-full px-6 py-2 rounded-xl font-semibold transition-all
                            ${processing
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-violet-400 to-fuchsia-400 text-white hover:shadow-lg  hover:scale-[1.02]'
                        }`}
                >
                    {processing ? 'Submitting...' : 'Submit Review'}
                </Button>
            </div>
        </form>
    )
}

export default FeedbackForm
