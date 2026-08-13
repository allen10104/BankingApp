export interface Customer {
    id: string
    name: string
    username: string
}

export interface CustomerCreate {
    name: string
    username: string
    password: string
}