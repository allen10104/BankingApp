import {
    useCallback,
    useEffect,
    useState
} from "react"

import {
    useNavigate
} from "react-router"


import DashboardSidebar
    from "../components/dashboard/DashboardSidebar"

import DashboardHeader
    from "../components/dashboard/DashboardHeader"

import BalanceSummary
    from "../components/dashboard/BalanceSummary"

import AccountsPanel
    from "../components/dashboard/AccountsPanel"

import TransactionsPanel
    from "../components/dashboard/TransactionsPanel"

import QuickTransfer
    from "../components/dashboard/QuickTransfer"


import {
    getCurrentCustomer
} from "../services/authService"

import {
    fetchAccounts
} from "../services/accountService"

import {
    fetchTransactions
} from "../services/transactionService"

import {
    clearToken
} from "../services/sessionService"


import type {
    Customer
} from "../types/customer"

import type {
    Account
} from "../types/account"

import type {
    Transaction
} from "../types/transaction"

import "./DashboardPage.css"

function DashboardPage() {

    const navigate = useNavigate()


    const [customer, setCustomer] =
        useState<Customer | null>(null)

    const [accounts, setAccounts] =
        useState<Account[]>([])

    const [transactions, setTransactions] =
        useState<Transaction[]>([])

    const [loading, setLoading] =
        useState(true)

    const [error, setError] =
        useState<string | null>(null)


    const loadDashboard = useCallback(
        async () => {

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


                setCustomer(
                    customerData
                )

                setAccounts(
                    accountData
                )

                setTransactions(
                    transactionData
                )

            } catch (error) {

                if (error instanceof Error) {

                    setError(
                        error.message
                    )

                } else {

                    setError(
                        "Unable to load dashboard"
                    )
                }

            } finally {

                setLoading(false)

            }

        },
        []
    )


    useEffect(() => {

        void loadDashboard()

    }, [loadDashboard])


    function handleLogout() {

        clearToken()

        navigate("/")
    }


    if (loading) {

        return (
            <div className="dashboard-loading">
                Loading dashboard...
            </div>
        )
    }


    if (error) {

        return (
            <div className="dashboard-loading">

                <p className="error-message">
                    {error}
                </p>

            </div>
        )
    }


    if (customer === null) {

        return null

    }


    return (
        <div className="dashboard-background">

            <div className="dashboard-shell">


                <DashboardSidebar
                    onLogout={handleLogout}
                />


                <main className="dashboard-content">


                    <DashboardHeader
                        customer={customer}
                    />


                    <BalanceSummary
                        accounts={accounts}
                    />


                    <div className="dashboard-grid">

                        <div className="dashboard-left-column">


                            <AccountsPanel
                                accounts={accounts}
                            />


                            <QuickTransfer
                                accounts={accounts}
                                onTransferComplete={
                                    loadDashboard
                                }
                            />


                        </div>


                        <TransactionsPanel
                            accounts={accounts}
                            transactions={
                                transactions
                            }
                        />


                    </div>

                </main>

            </div>

        </div>
    )
}


export default DashboardPage