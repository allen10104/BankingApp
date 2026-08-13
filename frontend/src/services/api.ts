import { getToken } from "./sessionService"


const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ??
    "http://127.0.0.1:8000/api/v1"


export function apiUrl(path: string) {return `${API_BASE_URL}${path}`}


export async function authenticatedFetch(
    path: string,
    options: RequestInit = {}
) {

    const token = getToken()

    if (token === null) {
        throw new Error("Not logged in")
    }

    const headers = new Headers(
        options.headers
    )

    headers.set("Authorization",`Bearer ${token}`)

    return fetch(
        apiUrl(path),
        {
            ...options,
            headers
        }
    )
}