interface Category {
    id: number
    name: string
    type: string
    parent?: {
        id: number
        name: string
    } | null
}
