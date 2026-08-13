import type { Transaction } from "../types/transaction"

import { authenticatedFetch } from "./api"


export interface TransferRequest {
    from_account_id: string
    to_account_id: string
    amount: number
}


export async function fetchTransactions():
Promise<Transaction[]> {

    const response = await authenticatedFetch(
        "/transactions"
    )

    if (!response.ok) {
        throw new Error(
            "Failed to load transactions"
        )
    }

    return await response.json()
}


export async function createTransfer(
    transferData: TransferRequest
): Promise<Transaction> {

    const response = await authenticatedFetch(
        "/transactions/transfer",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(transferData)
        }
    )

    if (!response.ok) {

        const errorData = await response.json()

        throw new Error(
            errorData.detail ??
            "Transfer failed"
        )
    }

    return await response.json()
}