import type {
    Account,
    AccountCreate
} from "../types/account"

import {
    authenticatedFetch
} from "./api"


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


    return await response.json()
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


            if (errorData.detail) {

                message =
                    errorData.detail
            }

        } catch {
            // Keep default message
        }


        throw new Error(message)
    }


    return await response.json()
}