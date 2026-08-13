import type { Customer } from "../types/customer"

import {apiUrl, authenticatedFetch} from "./api"


export interface LoginRequest {
    username: string
    password: string
}


export interface TokenResponse {
    access_token: string
    token_type: string
}


export async function login(loginData: LoginRequest): Promise<TokenResponse> {
    const response = await fetch(
        apiUrl("/auth/login"),
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(
                loginData
            )
        }
    )

    if (!response.ok) {
        throw new Error(
            "Incorrect username or password"
        )
    }

    return await response.json()
}


export async function getCurrentCustomer(): Promise<Customer> {
    const response = await authenticatedFetch(
        "/auth/me"
    )

    if (!response.ok) {
        throw new Error(
            "Session expired"
        )
    }

    return await response.json()
}