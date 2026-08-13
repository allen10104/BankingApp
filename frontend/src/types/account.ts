export type AccountType =
    "CHECKING" | "SAVINGS"


export interface Account {
    id: string
    customer_id: string
    account_number: string
    account_type: AccountType
    branch_id: number
    balance: number
}


export interface AccountCreate {
    account_type: AccountType
    branch_id: number
}