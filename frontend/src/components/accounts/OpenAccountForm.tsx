import {
    useState
} from "react"

import {
    createAccount
} from "../../services/accountService"

import type {
    AccountType
} from "../../types/account"

import "./OpenAccountForm.css"


interface OpenAccountFormProps {
    onAccountCreated:
        () => Promise<void>
}


function OpenAccountForm({
    onAccountCreated
}: OpenAccountFormProps) {

    const [accountType, setAccountType] =
        useState<AccountType>(
            "CHECKING"
        )

    const [branchId, setBranchId] =
        useState("")

    const [error, setError] =
        useState<string | null>(null)

    const [success, setSuccess] =
        useState<string | null>(null)

    const [loading, setLoading] =
        useState(false)


    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault()

        setError(null)
        setSuccess(null)

        setLoading(true)


        try {

            await createAccount({
                account_type: accountType,
                branch_id: Number(branchId)
            })


            setSuccess(
                `${
                    accountType === "CHECKING"
                        ? "Checking"
                        : "Savings"
                } account opened successfully.`
            )


            setBranchId("")


            await onAccountCreated()

        } catch (error) {

            if (error instanceof Error) {

                setError(
                    error.message
                )

            } else {

                setError(
                    "Unable to open account"
                )
            }

        } finally {

            setLoading(false)

        }
    }


    return (
        <section className="open-account-panel">

            <div className="open-account-heading">

                <span>
                    NEW ACCOUNT
                </span>

                <h2>
                    Open an Account
                </h2>

                <p>
                    Add a checking or savings
                    account to your profile.
                </p>

            </div>


            <form
                className="open-account-form"
                onSubmit={handleSubmit}
            >

                <div className="open-account-field">

                    <label htmlFor="account-type">
                        Account Type
                    </label>

                    <select
                        id="account-type"
                        value={accountType}
                        onChange={
                            event =>
                                setAccountType(
                                    event.target.value as AccountType
                                )
                        }
                    >

                        <option value="CHECKING">
                            Checking
                        </option>

                        <option value="SAVINGS">
                            Savings
                        </option>

                    </select>

                </div>


                <div className="open-account-field">

                    <label htmlFor="branch-id">
                        Branch ID
                    </label>

                    <input
                        id="branch-id"
                        type="number"
                        placeholder="Example: 123"
                        value={branchId}
                        onChange={
                            event =>
                                setBranchId(
                                    event.target.value
                                )
                        }
                        required
                    />

                </div>


                {error && (

                    <p className="open-account-error">
                        {error}
                    </p>

                )}


                {success && (

                    <p className="open-account-success">
                        {success}
                    </p>

                )}


                <button
                    className="open-account-button"
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Opening Account..."
                        : "Open Account"
                    }

                </button>

            </form>

        </section>
    )
}


export default OpenAccountForm