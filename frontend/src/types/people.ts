import type {
    AccountType
} from "./account"


export interface DirectoryAccount {
    account_id: string
    account_type: AccountType
    last_four: string
}


export interface Person {
    id: string
    name: string
    username: string
    accounts: DirectoryAccount[]
}