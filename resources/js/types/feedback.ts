interface Feedback {
    id: number
    rating: number
    review: string
    publication_id: number
    user_id: number
    user?: {
        id: number
        name: string
    }
    publication?: {
        title: string
        type: string
    }
}
