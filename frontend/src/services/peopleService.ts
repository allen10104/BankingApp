import type {
    Person
} from "../types/people"

import {
    authenticatedFetch
} from "./api"


export async function fetchPeople():
Promise<Person[]> {

    const response =
        await authenticatedFetch(
            "/customers/directory"
        )


    if (!response.ok) {

        throw new Error(
            "Failed to load customers"
        )
    }


    return await response.json()
}