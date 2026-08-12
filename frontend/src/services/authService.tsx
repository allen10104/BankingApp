const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ??
    "http://127.0.0.1:8000/api/v1"


const LOGIN_PATH =
    import.meta.env.VITE_LOGIN_PATH ??
    "/login"


export interface LoginRequest {
    username: string
    password: string
}


export async function login(
    loginData: LoginRequest
) {

    const response = await fetch(
        `${API_BASE_URL}${LOGIN_PATH}`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(loginData)
        }
    )


    if (!response.ok) {
        throw new Error(
            `Login failed (${response.status})`
        )
    }


    return await response.json()
}