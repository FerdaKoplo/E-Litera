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
        }
    }
}
