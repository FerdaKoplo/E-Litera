interface UserAddress {
    id: number
    user_id: number
    full_address?: string

    province_id?: number
    province_name?: string

    city_id?: number
    city_name?: string

    district_id?: number
    district_name?: string

    sub_district_id?: number
    sub_district_name?: string

    postal_code?: string

    created_at: string
    updated_at: string
}
