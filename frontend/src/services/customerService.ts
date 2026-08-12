import type {
    Customer,
    CustomerCreate
} from "../types/customer"


const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ??
    "http://127.0.0.1:8000/api/v1"


export async function fetchCustomers(): Promise<Customer[]> {
    const response = await fetch(
        `${API_BASE_URL}/customers`
    )

    if (!response.ok) {
        throw new Error(
            `Failed to fetch customers (${response.status})`
        )
    }

    return await response.json()
}


export async function createCustomer(customerData: CustomerCreate): Promise<Customer> {
    const response = await fetch(
        `${API_BASE_URL}/customers`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(customerData)
        }
    )

    if (!response.ok) {
        throw new Error(
            `Failed to create account (${response.status})`
        )
    }

    return await response.json()
}