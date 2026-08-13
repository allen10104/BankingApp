import type { Account } from "../types/account"

import { authenticatedFetch } from "./api"


export async function fetchAccounts():
Promise<Account[]> {

    const response = await authenticatedFetch(
        "/accounts"
    )

    if (!response.ok) {
        throw new Error(
            "Failed to load accounts"
        )
    }

    return await response.json()
}