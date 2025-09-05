export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string,
    role: string
    profile?: string
    phone_number?: string
    instagram?: string
    facebook?: string
    created_at: Date
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

export interface HighestRatedPublication {
    id: number
    title: string
    avg_rating: number
    total_ratings?: number
}

export type LoanFilter = {
  period: "today" | "7days" | "30days" | "all"
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User
    }
    notifications: Notification[]
    publications: number
    loansTotal: number
    loansActive: number
    loansOverdue: number
    articles: number
    loanChartData: { date: string, count: number }[]
    filters?: LoanFilter,
    highestRatedPublications: HighestRatedPublication[]
}


