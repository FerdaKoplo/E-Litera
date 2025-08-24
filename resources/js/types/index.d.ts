export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string
    role: string
}

export interface Notification {
    id: string
    type: string
    notifiable_id: number | string
    notifiable_type: string
    data: Record<string, any>
    read_at: string | null
    created_at: string
    updated_at: string
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User
    }

    notifications : Notification[]
}
