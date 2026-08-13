export interface Account {
    id: string
    customer_id: string
    account_number: string
    account_type: "CHECKING" | "SAVINGS"
    branch_id: number
    balance: number
}