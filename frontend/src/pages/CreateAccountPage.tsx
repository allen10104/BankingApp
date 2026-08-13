import { useState } from "react"
import { Link, useNavigate } from "react-router"

import { createCustomer } from "../services/customerService"

import "./CreateAccountPage.css"


function CreateAccountPage() {

    const navigate = useNavigate()

    const [name, setName] = useState("")
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

            await createCustomer({
                name,
                username,
                password
            })

            navigate("/login")

        } catch (error) {

            if (error instanceof Error) {

                setError(
                    error.message
                )

            } else {

                setError(
                    "Unable to create account"
                )
            }

        } finally {

            setLoading(false)

        }
    }


    return (
        <main className="create-background">

            <div className="create-shell">


                <section className="create-brand-panel">

                    <Link
                        className="create-logo"
                        to="/"
                    >
                        The Bank
                    </Link>


                    <div className="create-brand-content">

                        <span className="create-eyebrow">
                            START BANKING
                        </span>

                        <h1>
                            Your money.
                            <br />
                            Your account.
                            <br />
                            Your bank.
                        </h1>

                        <p>
                            Create your profile and get
                            started with a simple banking
                            experience built around your
                            accounts and transactions.
                        </p>

                    </div>


                    <div className="create-feature-list">

                        <div className="create-feature">

                            <div className="create-feature-icon">
                                $
                            </div>

                            <div>
                                <strong>
                                    Track your balances
                                </strong>

                                <span>
                                    View checking and savings
                                    accounts in one dashboard.
                                </span>
                            </div>

                        </div>


                        <div className="create-feature">

                            <div className="create-feature-icon peach">
                                ⇄
                            </div>

                            <div>
                                <strong>
                                    Transfer funds
                                </strong>

                                <span>
                                    Move money between your
                                    accounts with ease.
                                </span>
                            </div>

                        </div>


                        <div className="create-feature">

                            <div className="create-feature-icon blue">
                                ≡
                            </div>

                            <div>
                                <strong>
                                    Review activity
                                </strong>

                                <span>
                                    Keep track of your
                                    transaction history.
                                </span>
                            </div>

                        </div>

                    </div>

                </section>


                <section className="create-form-panel">

                    <div className="create-form-container">

                        <div className="create-heading">

                            <span className="create-eyebrow dark">
                                OPEN YOUR ACCOUNT
                            </span>

                            <h2>
                                Create an Account
                            </h2>

                            <p>
                                Enter your information to
                                create your profile with
                                The Bank.
                            </p>

                        </div>


                        <form
                            className="create-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="create-field">

                                <label htmlFor="name">
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={
                                        event =>
                                            setName(
                                                event.target.value
                                            )
                                    }
                                    autoComplete="name"
                                    required
                                />

                            </div>


                            <div className="create-field">

                                <label htmlFor="username">
                                    Username
                                </label>

                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Choose a username"
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


                            <div className="create-field">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={
                                        event =>
                                            setPassword(
                                                event.target.value
                                            )
                                    }
                                    autoComplete="new-password"
                                    required
                                />

                            </div>


                            {error && (

                                <div className="create-error">
                                    {error}
                                </div>

                            )}


                            <button
                                className="create-submit-button"
                                type="submit"
                                disabled={loading}
                            >

                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"
                                }

                            </button>

                        </form>


                        <div className="create-login">

                            <span>
                                Already have an account?
                            </span>

                            <Link to="/login">
                                Log in
                            </Link>

                        </div>


                        <Link
                            className="create-home-link"
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


export default CreateAccountPage