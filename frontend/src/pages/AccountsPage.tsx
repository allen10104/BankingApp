import {
    useEffect,
    useState
} from "react"

import {
    Link,
    useNavigate
} from "react-router"


import DashboardSidebar
    from "../components/dashboard/DashboardSidebar"

import DashboardHeader
    from "../components/dashboard/DashboardHeader"

import AccountsSummary
    from "../components/accounts/AccountsSummary"

import AccountList
    from "../components/accounts/AccountList"


import {
    getCurrentCustomer
} from "../services/authService"

import {
    fetchAccounts
} from "../services/accountService"

import {
    clearToken
} from "../services/sessionService"


import type {
    Customer
} from "../types/customer"

import type {
    Account
} from "../types/account"


import "./DashboardPage.css"
import "./AccountsPage.css"


function AccountsPage() {

    const navigate =
        useNavigate()


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
        loading,
        setLoading
    ] = useState(true)


    const [
        error,
        setError
    ] = useState<string | null>(
        null
    )


    useEffect(() => {

        async function loadPage() {

            try {

                const [
                    customerData,
                    accountData
                ] = await Promise.all([
                    getCurrentCustomer(),
                    fetchAccounts()
                ])


                setCustomer(
                    customerData
                )

                setAccounts(
                    accountData
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
                        "Unable to load accounts"
                    )
                }

            } finally {

                setLoading(false)

            }
        }


        void loadPage()

    }, [])


    function handleLogout() {

        clearToken()

        navigate("/")
    }


    if (loading) {

        return (
            <div className="dashboard-loading">
                Loading accounts...
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


                    <header className="accounts-page-header">

                        <div>

                            <span>
                                BANK ACCOUNTS
                            </span>

                            <h1>
                                Accounts
                            </h1>

                            <p>
                                Manage your checking
                                and savings accounts.
                            </p>

                        </div>


                        <Link
                            className="open-account-link"
                            to="/accounts/open"
                        >
                            + Open New Account
                        </Link>

                    </header>


                    <AccountsSummary
                        accounts={
                            accounts
                        }
                    />


                    <AccountList
                        accounts={
                            accounts
                        }
                    />


                </main>

            </div>

        </div>
    )
}


export default AccountsPage