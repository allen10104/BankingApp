import { useState } from "react"
import { Link, useNavigate } from "react-router"

import { login } from "../services/authService"


function LoginPage() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)


    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault()

        setError(null)
        setLoading(true)

        try {

            await login({
                username: username,
                password: password
            })

            navigate("/customers")

        } catch (error) {

            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("Unable to log in")
            }

        } finally {

            setLoading(false)
        }
    }


    return (
        <main className="form-page">

            <section className="form-card">

                <h1>Welcome Back</h1>

                <p>
                    Log in to The Bank.
                </p>


                <form onSubmit={handleSubmit}>

                    <label htmlFor="username">
                        Username
                    </label>

                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(event) =>
                            setUsername(event.target.value)
                        }
                        required
                    />


                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                    />


                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}


                    <button
                        className="primary-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Log In"
                        }
                    </button>

                </form>


                <p className="form-footer">
                    Don't have an account?{" "}

                    <Link to="/create-account">
                        Create one
                    </Link>
                </p>

            </section>

        </main>
    )
}


export default LoginPage