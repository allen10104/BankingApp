import { useState } from "react"

import {
    createTransfer
} from "../../services/transactionService"

import type {
    Account
} from "../../types/account"

import {
    formatMoney
} from "../../utils/formatMoney"
import "./DashboardPanel.css"
import "./QuickTransfer.css"


interface QuickTransferProps {
    accounts: Account[]

    onTransferComplete:
        () => Promise<void>
}


function QuickTransfer({
    accounts,
    onTransferComplete
}: QuickTransferProps) {

    const [fromAccountId, setFromAccountId] =
        useState("")

    const [toAccountId, setToAccountId] =
        useState("")

    const [transferAmount, setTransferAmount] =
        useState("")

    const [error, setError] =
        useState<string | null>(null)

    const [success, setSuccess] =
        useState<string | null>(null)


    function getAccountLabel(
        account: Account
    ) {

        const type =
            account.account_type === "CHECKING"
                ? "Checking"
                : "Savings"

        return (
            `${type} •••• ${account.account_number.slice(-4)}`
        )
    }


    async function handleTransfer(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault()

        setError(null)
        setSuccess(null)

        const amount = Number(
            transferAmount
        )


        if (
            fromAccountId === "" ||
            toAccountId === ""
        ) {
            setError(
                "Please select both accounts."
            )

            return
        }


        if (
            fromAccountId === toAccountId
        ) {
            setError(
                "Choose two different accounts."
            )

            return
        }


        if (amount <= 0) {
            setError(
                "Transfer amount must be greater than 0."
            )

            return
        }


        try {

            await createTransfer({
                from_account_id: fromAccountId,
                to_account_id: toAccountId,
                amount
            })


            setSuccess(
                "Transfer completed successfully."
            )

            setTransferAmount("")

            await onTransferComplete()

        } catch (error) {

            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError(
                    "Unable to complete transfer."
                )
            }
        }
    }


    return (
        <section
            id="transfer"
            className="dashboard-panel"
        >

            <div className="panel-heading">

                <h2>
                    Quick Transfer
                </h2>

            </div>


            {accounts.length < 2 ? (

                <div className="dashboard-empty">

                    <strong>
                        Two accounts required
                    </strong>

                    <p>
                        You need at least two
                        accounts to make an
                        internal transfer.
                    </p>

                </div>

            ) : (

                <form
                    className="transfer-form"
                    onSubmit={handleTransfer}
                >

                    <div className="transfer-field">

                        <label>
                            From
                        </label>

                        <select
                            value={fromAccountId}
                            onChange={
                                event =>
                                    setFromAccountId(
                                        event.target.value
                                    )
                            }
                            required
                        >

                            <option value="">
                                Select account
                            </option>

                            {accounts.map(
                                account => (

                                    <option
                                        key={account.id}
                                        value={account.id}
                                    >
                                        {getAccountLabel(
                                            account
                                        )}

                                        {" — "}

                                        {formatMoney(
                                            account.balance
                                        )}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    <div className="transfer-arrow">
                        →
                    </div>


                    <div className="transfer-field">

                        <label>
                            To
                        </label>

                        <select
                            value={toAccountId}
                            onChange={
                                event =>
                                    setToAccountId(
                                        event.target.value
                                    )
                            }
                            required
                        >

                            <option value="">
                                Select account
                            </option>

                            {accounts.map(
                                account => (

                                    <option
                                        key={account.id}
                                        value={account.id}
                                    >
                                        {getAccountLabel(
                                            account
                                        )}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    <div className="transfer-field">

                        <label>
                            Amount
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            placeholder="0.00"
                            value={transferAmount}
                            onChange={
                                event =>
                                    setTransferAmount(
                                        event.target.value
                                    )
                            }
                            required
                        />

                    </div>


                    <button
                        className="transfer-button"
                        type="submit"
                    >
                        Transfer
                    </button>


                    {error && (

                        <p className="transfer-error">
                            {error}
                        </p>

                    )}


                    {success && (

                        <p className="transfer-success">
                            {success}
                        </p>

                    )}

                </form>

            )}

        </section>
    )
}

export default QuickTransfer