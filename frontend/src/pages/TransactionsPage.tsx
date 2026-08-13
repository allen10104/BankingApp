import {
    useCallback,
    useEffect,
    useState
} from "react"

import {
    useNavigate,
    useSearchParams
} from "react-router"


import DashboardSidebar
    from "../components/dashboard/DashboardSidebar"

import DashboardHeader
    from "../components/dashboard/DashboardHeader"


import TransactionActions
    from "../components/transactions/TransactionActions"

import TransactionForm
    from "../components/transactions/TransactionForm"

import TransactionHistory
    from "../components/transactions/TransactionHistory"


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
    Transaction,
    TransactionType
} from "../types/transaction"


import "./DashboardPage.css"
import "./TransactionsPage.css"


function TransactionsPage() {

    const navigate =
        useNavigate()


    const [
        searchParams,
        setSearchParams
    ] = useSearchParams()


    const initialType =
        searchParams.get("type")


    const [
        selectedType,
        setSelectedType
    ] = useState<TransactionType | null>(
        initialType === "DEPOSIT" ||
        initialType === "WITHDRAW" ||
        initialType === "TRANSFER"
            ? initialType
            : null
    )


    const [
        customer,
        setCustomer
    ] = useState<Customer | null>(
        null
    )


    const [
        accounts,
        setAccounts
    ] = useState<Account[]>([])


    const [
        transactions,
        setTransactions
    ] = useState<Transaction[]>([])


    const [
        loading,
        setLoading
    ] = useState(true)


    const [
        error,
        setError
    ] = useState<string | null>(
        null
    )


    const loadTransactionData =
        useCallback(
            async () => {

                const [
                    accountData,
                    transactionData
                ] = await Promise.all([
                    fetchAccounts(),
                    fetchTransactions()
                ])


                setAccounts(
                    accountData
                )

                setTransactions(
                    transactionData
                )

            },
            []
        )


    useEffect(() => {

        async function loadPage() {

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

                if (
                    error instanceof Error
                ) {

                    setError(
                        error.message
                    )

                } else {

                    setError(
                        "Unable to load transactions"
                    )
                }

            } finally {

                setLoading(false)

            }
        }


        void loadPage()

    }, [])


    function handleSelect(
        type: TransactionType
    ) {

        setSelectedType(type)

        setSearchParams({
            type: type
        })
    }


    function handleLogout() {

        clearToken()

        navigate("/")
    }


    if (loading) {

        return (
            <div className="dashboard-loading">
                Loading transactions...
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
                    onLogout={
                        handleLogout
                    }
                />


                <main className="dashboard-content">

                    <DashboardHeader
                        customer={
                            customer
                        }
                    />


                    <header className="transactions-page-header">

                        <span>
                            MONEY MOVEMENT
                        </span>

                        <h1>
                            Transactions
                        </h1>

                        <p>
                            Deposit, withdraw,
                            transfer, and review
                            your recent activity.
                        </p>

                    </header>


                    <TransactionActions
                        selectedType={
                            selectedType
                        }

                        onSelect={
                            handleSelect
                        }
                    />


                    {selectedType !== null && (

                        <TransactionForm
                            key={
                                selectedType
                            }

                            transactionType={
                                selectedType
                            }

                            accounts={
                                accounts
                            }

                            onTransactionComplete={
                                loadTransactionData
                            }
                        />

                    )}


                    <TransactionHistory
                        accounts={
                            accounts
                        }

                        transactions={
                            transactions
                        }
                    />

                </main>

            </div>

        </div>
    )
}


export default TransactionsPage