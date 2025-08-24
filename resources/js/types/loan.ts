interface Loan {
    id: number
    user_id: number
    publication_id: number
    start_date: string
    due_date: string
    status: 'borrowed' | 'returned' | 'overdue'
    fine_amount: number
    created_at: string
    updated_at: string
    publication?: {
        id: number
        title: string
        author: string
        type: string
        category_id: string
        location_id: string
        download_count: string
        publication_description: string
        pdf_url: string
        image_url: string
        category?: {
            id: number
            name: string
        }
        location?: {
            id: number
            name: string
        }
    }
}
