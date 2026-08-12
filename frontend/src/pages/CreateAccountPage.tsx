import { useState } from "react"
import { Link, useNavigate } from "react-router"

import { createCustomer } from "../services/customerService"


function CreateAccountPage() {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)


    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault()

        setError(null)
        setLoading(true)

        try {

            await createCustomer({
                name: name,
                username: username
            })

            navigate("/customers")

        } catch (error) {

            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("Unable to create account")
            }

        } finally {

            setLoading(false)
        }
    }


    return (
        <main className="form-page">

            <section className="form-card">

                <h1>Create an Account</h1>

                <p>
                    Create your customer profile with The Bank.
                </p>

                <form onSubmit={handleSubmit}>

                    <label htmlFor="name">
                        Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        required
                    />


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
                            ? "Creating..."
                            : "Create Account"
                        }
                    </button>

                </form>


                <p className="form-footer">
                    Already have an account?{" "}

                    <Link to="/login">
                        Log in
                    </Link>
                </p>

            </section>

        </main>
    )
}


export default CreateAccountPage