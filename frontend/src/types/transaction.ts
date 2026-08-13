export interface Transaction {
    id: string
    transaction_type: string
    from_account_id: string
    to_account_id: string
    amount: number
    created_at: string
}