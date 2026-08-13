import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { getCurrentCustomer } from "../services/authService"
import { fetchAccounts } from "../services/accountService"
import { fetchTransactions } from "../services/transactionService"
import { clearToken } from "../services/sessionService"

import type { Customer } from "../types/customer"
import type { Account } from "../types/account"
import type { Transaction } from "../types/transaction"


function DashboardPage() {

    const navigate = useNavigate()

    const [customer, setCustomer] = useState<Customer | null>(null)
    const [accounts, setAccounts] = useState<Account[]>([])
    const [transactions, setTransactions] = useState<Transaction[]>([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {

        async function loadDashboard() {

            try {

                const [
                    customerData,
                    accountData,
                    transactionData
                ] = await Promise.all([
                    getCurrentCustomer(),
                    fetchAccounts(),
                    fetchTransactions()
                ])

                setCustomer(customerData)
                setAccounts(accountData)
                setTransactions(transactionData)

            } catch (error) {

                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError("Unable to load dashboard")
                }

            } finally {
                setLoading(false)
            }
        }

        void loadDashboard()

    }, [])


    function handleLogout() {

        clearToken()

        navigate("/")
    }


    function getAccountName(accountId: string) {

        const account = accounts.find(
            account => account.id === accountId
        )

        if (account === undefined) {
            return "Account"
        }

        const accountType =
            account.account_type === "CHECKING"
                ? "Checking"
                : "Savings"

        return `${accountType} •••• ${account.account_number.slice(-4)}`
    }


    const totalBalance = accounts.reduce(
        (total, account) => total + account.balance,
        0
    )


    if (loading) {

        return (
            <main className="dashboard-message">
                <p>Loading dashboard...</p>
            </main>
        )
    }


    if (error) {

        return (
            <main className="dashboard-message">
                <p className="error-message">
                    {error}
                </p>
            </main>
        )
    }


    return (
        <div className="dashboard-layout">

            <aside className="dashboard-sidebar">

                <h2>The Bank</h2>

                <nav>
                    <p className="sidebar-active">
                        Dashboard
                    </p>

                    <p>
                        Accounts
                    </p>

                    <p>
                        Transactions
                    </p>

                    <p>
                        Transfer
                    </p>
                </nav>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Log Out
                </button>

            </aside>


            <main className="dashboard-main">

                <header className="dashboard-header">

                    <div>
                        <p>Welcome back,</p>

                        <h1>
                            {customer?.name}
                        </h1>
                    </div>

                    <div className="customer-avatar">
                        {customer?.name
                            .charAt(0)
                            .toUpperCase()}
                    </div>

                </header>


                <section className="total-balance-card">

                    <p>Total Balance</p>

                    <h2>
                        ${totalBalance.toLocaleString(
                            "en-US",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        )}
                    </h2>

                    <span>
                        Across {accounts.length}{" "}
                        {accounts.length === 1
                            ? "account"
                            : "accounts"}
                    </span>

                </section>


                <section className="dashboard-section">

                    <h2>Your Accounts</h2>

                    {accounts.length === 0 ? (

                        <div className="empty-state">

                            <h3>No accounts yet</h3>

                            <p>
                                You do not currently have a
                                checking or savings account.
                            </p>

                        </div>

                    ) : (

                        <div className="account-grid">

                            {accounts.map(account => (

                                <article
                                    className="account-card"
                                    key={account.id}
                                >

                                    <div className="account-card-header">

                                        <h3>
                                            {account.account_type ===
                                            "CHECKING"
                                                ? "Checking"
                                                : "Savings"}
                                        </h3>

                                        <span>
                                            •••
                                        </span>

                                    </div>


                                    <p className="account-number">
                                        ••••{" "}
                                        {account.account_number.slice(-4)}
                                    </p>


                                    <p className="balance-label">
                                        Available Balance
                                    </p>


                                    <strong className="account-balance">

                                        ${account.balance.toLocaleString(
                                            "en-US",
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }
                                        )}

                                    </strong>

                                </article>

                            ))}

                        </div>

                    )}

                </section>


                <section className="dashboard-section">

                    <h2>Recent Transactions</h2>

                    {transactions.length === 0 ? (

                        <div className="empty-state">

                            <h3>No transactions yet</h3>

                            <p>
                                Your recent activity will
                                appear here.
                            </p>

                        </div>

                    ) : (

                        <div className="transaction-list">

                            {transactions
                                .slice(0, 10)
                                .map(transaction => (

                                    <div
                                        className="transaction-row"
                                        key={transaction.id}
                                    >

                                        <div className="transaction-icon">
                                            ↔
                                        </div>


                                        <div className="transaction-details">

                                            <strong>
                                                Transfer
                                            </strong>

                                            <span>
                                                {getAccountName(
                                                    transaction.from_account_id
                                                )}

                                                {" → "}

                                                {getAccountName(
                                                    transaction.to_account_id
                                                )}
                                            </span>

                                        </div>


                                        <div className="transaction-date">

                                            {new Date(
                                                transaction.created_at
                                            ).toLocaleDateString()}

                                        </div>


                                        <strong className="transaction-amount">

                                            ${transaction.amount.toFixed(2)}

                                        </strong>

                                    </div>

                                ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    )
}


export default DashboardPage