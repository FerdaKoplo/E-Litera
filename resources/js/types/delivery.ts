interface Delivery {
    id: number
    loan_id: number
    tracking_number: string
    courier: string
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
    loan? : {
        status: 'borrowed' | 'returned' | 'overdue' | 'pending'
        user? : {
            name : string
        },
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
}
