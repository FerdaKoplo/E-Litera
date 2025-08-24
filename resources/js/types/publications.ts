interface Publications {
    id: number
    title: string
    author: string
    type: string
    category_id: string
    location_id: string
    download_count: string
    publication_description: string
    pdf_url: string | File
    image_url: string | File
    category?: {
        id: number;
        name: string
    }
    location?: {
        id: number;
        name: string
    }
    is_available?: boolean
}

interface EditPublicationProps {
    publication: Publications
    categories: { id: number; name: string }[]
    locations: { id: number; name: string }[]
}
