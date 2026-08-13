import type {
    Transaction,
    TransactionCreate
} from "../types/transaction"

import {
    authenticatedFetch
} from "./api"


export async function fetchTransactions():
Promise<Transaction[]> {

    const response =
        await authenticatedFetch(
            "/transactions"
        )


    if (!response.ok) {
        throw new Error("Failed to load transactions")
    }


    return await response.json()
}


export async function createTransaction(
    transactionData: TransactionCreate
): Promise<Transaction> {

    const response = await authenticatedFetch(
        "/transactions",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(
                transactionData
            )
        }
    )


    if (!response.ok) {

        const errorData = await response.json()

        let message = "Transaction failed"


        if (typeof errorData.detail === "string") {

            message = errorData.detail

        } else if (
            Array.isArray(errorData.detail)
            &&
            errorData.detail.length > 0
        ) {

            message =
                errorData.detail[0].msg

        }


        throw new Error(message)
    }


    return await response.json()
}


export async function createDeposit(
    accountId: string,
    amount: number
) {

    return createTransaction({
        transaction_type: "DEPOSIT",
        account_id: accountId,
        amount: amount
    })
}


export async function createWithdrawal(
    accountId: string,
    amount: number
) {

    return createTransaction({
        transaction_type: "WITHDRAW",
        account_id: accountId,
        amount: amount
    })
}


export interface TransferRequest {
    from_account_id: string
    to_account_id: string
    amount: number
}


export async function createTransfer(
    transferData: TransferRequest
) {

    return createTransaction({
        transaction_type: "TRANSFER",

        from_account_id:
            transferData.from_account_id,

        to_account_id:
            transferData.to_account_id,

        amount:
            transferData.amount
    })
}