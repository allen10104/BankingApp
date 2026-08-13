export type TransactionType =
    "DEPOSIT" |
    "WITHDRAW" |
    "TRANSFER"


export interface Transaction {
    id: string
    transaction_type: TransactionType
    from_account_id: string | null
    to_account_id: string | null
    amount: number
    created_at: string
}


export interface TransactionCreate {
    transaction_type: TransactionType
    amount: number
    account_id?: string
    from_account_id?: string
    to_account_id?: string
}