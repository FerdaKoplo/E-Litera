interface Delivery {
    id: number
    loan_id: number
    tracking_number: string
    courier: string
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
    loan?: {
        status: 'borrowed' | 'returned' | 'overdue' | 'pending'
        user?: {
            name: string
            address?: {
                full_address?: string

                province_name?: string

                city_name?: string

                district_name?: string

                sub_district_name?: string

                postal_code?: string

                created_at: string
                updated_at: string
            }
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
