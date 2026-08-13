import type {
    Account,
    AccountCreate
} from "../types/account"

import {
    authenticatedFetch
} from "./api"


interface AccountResponse {
    _id?: string
    id?: string
    customer_id: string
    account_number: string
    account_type: "CHECKING" | "SAVINGS"
    branch_id: number
    balance: number
}


function normalizeAccount(
    account: AccountResponse
): Account {

    return {
        id: account.id ?? account._id ?? "",
        customer_id: account.customer_id,
        account_number: account.account_number,
        account_type: account.account_type,
        branch_id: account.branch_id,
        balance: account.balance
    }
}


export async function fetchAccounts():
Promise<Account[]> {

    const response =
        await authenticatedFetch(
            "/accounts"
        )


    if (!response.ok) {

        throw new Error(
            "Failed to load accounts"
        )
    }


    const data: AccountResponse[] =
        await response.json()


    return data.map(
        normalizeAccount
    )
}


export async function createAccount(
    accountData: AccountCreate
): Promise<Account> {

    const response =
        await authenticatedFetch(
            "/accounts",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(
                    accountData
                )
            }
        )


    if (!response.ok) {

        let message =
            "Unable to create account"


        try {

            const errorData =
                await response.json()


            if (
                typeof errorData.detail === "string"
            ) {

                message =
                    errorData.detail
            }

        } catch {
            // Keep default message
        }


        throw new Error(message)
    }


    const data: AccountResponse =
        await response.json()


    return normalizeAccount(
        data
    )
}