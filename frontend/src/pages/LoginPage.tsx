import { useState } from "react"
import { Link, useNavigate } from "react-router"

import { login } from "../services/authService"
import { saveToken } from "../services/sessionService"

import "./LoginPage.css"


function LoginPage() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] =
        useState<string | null>(null)

    const [loading, setLoading] =
        useState(false)


    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault()

        setError(null)
        setLoading(true)

        try {

            const result = await login({
                username,
                password
            })

            saveToken(
                result.access_token
            )

            navigate(
                "/dashboard"
            )

        } catch (error) {

            if (error instanceof Error) {

                setError(
                    error.message
                )

            } else {

                setError(
                    "Unable to log in"
                )
            }

        } finally {

            setLoading(false)

        }
    }


    return (
        <main className="login-background">

            <div className="login-shell">

                <section className="login-brand-panel">

                    <Link
                        className="login-logo"
                        to="/"
                    >
                        The Bank
                    </Link>


                    <div className="login-brand-content">

                        <span className="login-eyebrow">
                            WELCOME BACK
                        </span>

                        <h1>
                            Your finances,
                            <br />
                            all in one place.
                        </h1>

                        <p>
                            Access your accounts,
                            review recent activity,
                            and manage your money
                            from your personal dashboard.
                        </p>

                    </div>


                    <div className="login-preview-card">

                        <div className="login-preview-header">

                            <span>
                                The Bank
                            </span>

                            <span>
                                •••
                            </span>

                        </div>


                        <div className="login-preview-balance">

                            <span>
                                Available Balance
                            </span>

                            <strong>
                                $8,450.00
                            </strong>

                        </div>


                        <div className="login-preview-footer">

                            <span>
                                Everyday Checking
                            </span>

                            <span>
                                •••• 4821
                            </span>

                        </div>

                    </div>

                </section>


                <section className="login-form-panel">

                    <div className="login-form-container">

                        <div className="login-heading">

                            <span className="login-eyebrow">
                                SECURE SIGN IN
                            </span>

                            <h2>
                                Welcome Back
                            </h2>

                            <p>
                                Enter your credentials to
                                access The Bank.
                            </p>

                        </div>


                        <form
                            className="login-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="login-field">

                                <label htmlFor="username">
                                    Username
                                </label>

                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={
                                        event =>
                                            setUsername(
                                                event.target.value
                                            )
                                    }
                                    autoComplete="username"
                                    required
                                />

                            </div>


                            <div className="login-field">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={
                                        event =>
                                            setPassword(
                                                event.target.value
                                            )
                                    }
                                    autoComplete="current-password"
                                    required
                                />

                            </div>


                            {error && (

                                <div className="login-error">
                                    {error}
                                </div>

                            )}


                            <button
                                className="login-submit-button"
                                type="submit"
                                disabled={loading}
                            >

                                {loading
                                    ? "Logging in..."
                                    : "Log In"
                                }

                            </button>

                        </form>


                        <div className="login-create-account">

                            <span>
                                New to The Bank?
                            </span>

                            <Link to="/create-account">
                                Open an account
                            </Link>

                        </div>


                        <Link
                            className="login-home-link"
                            to="/"
                        >
                            ← Return to home
                        </Link>

                    </div>

                </section>

            </div>

        </main>
    )
}

export default LoginPage