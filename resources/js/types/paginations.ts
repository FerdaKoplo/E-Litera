type PaginationLink = {
  url: string | null
  label: string
  active: boolean
}

type PaginatedResponse<T> = {
  data: T[]
  links: PaginationLink[]
  meta: {
    current_page: number
    last_page: number
    from: number | null
    to: number | null
    total: number
    path: string
    per_page: number
  }
}
