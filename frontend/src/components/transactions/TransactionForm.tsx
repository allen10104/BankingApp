import {
    useState
} from "react"

import type {
    Account
} from "../../types/account"

import type {
    TransactionType
} from "../../types/transaction"

import {
    createDeposit,
    createTransfer,
    createWithdrawal
} from "../../services/transactionService"

import {
    formatMoney
} from "../../utils/formatMoney"

import "./TransactionForm.css"


interface TransactionFormProps {

    transactionType:
        TransactionType

    accounts:
        Account[]

    onTransactionComplete:
        () => Promise<void>
}


function TransactionForm({
    transactionType,
    accounts,
    onTransactionComplete
}: TransactionFormProps) {

    const [
        accountId,
        setAccountId
    ] = useState("")


    const [
        fromAccountId,
        setFromAccountId
    ] = useState("")


    const [
        toAccountId,
        setToAccountId
    ] = useState("")


    const [
        amount,
        setAmount
    ] = useState("")


    const [
        error,
        setError
    ] = useState<string | null>(
        null
    )


    const [
        success,
        setSuccess
    ] = useState<string | null>(
        null
    )


    const [
        loading,
        setLoading
    ] = useState(false)


    function getAccountLabel(
        account: Account
    ) {

        const type =
            account.account_type ===
            "CHECKING"
                ? "Checking"
                : "Savings"


        return (
            `${type} •••• ${
                account.account_number.slice(-4)
            } — ${
                formatMoney(account.balance)
            }`
        )
    }


    async function handleSubmit(
        event:
            React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault()

        setError(null)
        setSuccess(null)


        const numericAmount =
            Number(amount)


        if (numericAmount <= 0) {

            setError(
                "Amount must be greater than 0."
            )

            return
        }


        if (
            transactionType === "TRANSFER" &&
            fromAccountId === toAccountId
        ) {

            setError(
                "Choose two different accounts."
            )

            return
        }


        setLoading(true)


        try {

            if (
                transactionType === "DEPOSIT"
            ) {

                await createDeposit(
                    accountId,
                    numericAmount
                )
            }


            if (
                transactionType === "WITHDRAW"
            ) {

                await createWithdrawal(
                    accountId,
                    numericAmount
                )
            }


            if (
                transactionType === "TRANSFER"
            ) {

                await createTransfer({
                    from_account_id:
                        fromAccountId,
                    to_account_id:
                        toAccountId,
                    amount:
                        numericAmount
                })
            }


            setAmount("")
            setAccountId("")
            setFromAccountId("")
            setToAccountId("")


            setSuccess(
                `${
                    transactionType === "DEPOSIT"
                        ? "Deposit"
                        : transactionType === "WITHDRAW"
                            ? "Withdrawal"
                            : "Transfer"
                } completed successfully.`
            )


            await onTransactionComplete()

        } catch (error) {

            if (
                error instanceof Error
            ) {

                setError(
                    error.message
                )

            } else {

                setError(
                    "Unable to complete transaction."
                )
            }

        } finally {

            setLoading(false)

        }
    }


    const title =
        transactionType === "DEPOSIT"
            ? "Deposit Money"
            : transactionType === "WITHDRAW"
                ? "Withdraw Money"
                : "Transfer Money"


    const description =
        transactionType === "DEPOSIT"
            ? "Add funds to one of your accounts."
            : transactionType === "WITHDRAW"
                ? "Withdraw funds from one of your accounts."
                : "Move funds between your accounts."


    return (
        <section className="transaction-form-panel">

            <div className="transaction-form-heading">

                <span>
                    {transactionType}
                </span>

                <h2>
                    {title}
                </h2>

                <p>
                    {description}
                </p>

            </div>


            {accounts.length === 0 ? (

                <div className="transaction-form-empty">

                    <strong>
                        No accounts available
                    </strong>

                    <p>
                        Open an account before
                        making a transaction.
                    </p>

                </div>

            ) : (

                <form
                    className="transaction-form"
                    onSubmit={handleSubmit}
                >

                    {transactionType !==
                    "TRANSFER" ? (

                        <div className="transaction-form-field">

                            <label>
                                Account
                            </label>

                            <select
                                value={accountId}
                                onChange={
                                    event =>
                                        setAccountId(
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
                                            key={
                                                account.id
                                            }
                                            value={
                                                account.id
                                            }
                                        >
                                            {
                                                getAccountLabel(
                                                    account
                                                )
                                            }
                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                    ) : (

                        <div className="transfer-account-fields">

                            <div className="transaction-form-field">

                                <label>
                                    From
                                </label>

                                <select
                                    value={
                                        fromAccountId
                                    }
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
                                                key={
                                                    account.id
                                                }
                                                value={
                                                    account.id
                                                }
                                            >
                                                {
                                                    getAccountLabel(
                                                        account
                                                    )
                                                }
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            <div className="transaction-transfer-arrow">
                                →
                            </div>


                            <div className="transaction-form-field">

                                <label>
                                    To
                                </label>

                                <select
                                    value={
                                        toAccountId
                                    }
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
                                                key={
                                                    account.id
                                                }
                                                value={
                                                    account.id
                                                }
                                            >
                                                {
                                                    getAccountLabel(
                                                        account
                                                    )
                                                }
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                        </div>

                    )}


                    <div className="transaction-form-field">

                        <label>
                            Amount
                        </label>

                        <div className="transaction-amount-input">

                            <span>
                                $
                            </span>

                            <input
                                type="number"
                                min="0.01"
                                step="0.01"
                                placeholder="0.00"
                                value={amount}
                                onChange={
                                    event =>
                                        setAmount(
                                            event.target.value
                                        )
                                }
                                required
                            />

                        </div>

                    </div>


                    {error && (

                        <p className="transaction-form-error">
                            {error}
                        </p>

                    )}


                    {success && (

                        <p className="transaction-form-success">
                            {success}
                        </p>

                    )}


                    <button
                        className={
                            `transaction-submit-button ${
                                transactionType.toLowerCase()
                            }`
                        }
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Processing..."
                            : transactionType === "DEPOSIT"
                                ? "Deposit Funds"
                                : transactionType === "WITHDRAW"
                                    ? "Withdraw Funds"
                                    : "Transfer Funds"
                        }

                    </button>

                </form>

            )}

        </section>
    )
}


export default TransactionForm