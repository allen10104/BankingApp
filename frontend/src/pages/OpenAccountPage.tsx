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

import OpenAccountForm
    from "../components/accounts/OpenAccountForm"


import {
    getCurrentCustomer
} from "../services/authService"

import {
    clearToken
} from "../services/sessionService"


import type {
    Customer
} from "../types/customer"


import "./DashboardPage.css"
import "./OpenAccountPage.css"


function OpenAccountPage() {

    const navigate =
        useNavigate()


    const [
        customer,
        setCustomer
    ] = useState<Customer | null>(
        null
    )


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

                const customerData =
                    await getCurrentCustomer()


                setCustomer(
                    customerData
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
                        "Unable to load page"
                    )
                }

            } finally {

                setLoading(false)

            }
        }


        void loadPage()

    }, [])


    async function handleAccountCreated() {

        navigate(
            "/accounts"
        )
    }


    function handleLogout() {

        clearToken()

        navigate("/")
    }


    if (loading) {

        return (
            <div className="dashboard-loading">
                Loading...
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


                    <div className="open-account-page-header">

                        <div>

                            <span>
                                NEW BANK ACCOUNT
                            </span>

                            <h1>
                                Open an Account
                            </h1>

                            <p>
                                Choose the type of
                                account you'd like
                                to open.
                            </p>

                        </div>


                        <Link
                            className="back-to-accounts"
                            to="/accounts"
                        >
                            ← Back to Accounts
                        </Link>

                    </div>


                    <div className="open-account-page-content">

                        <OpenAccountForm
                            onAccountCreated={
                                handleAccountCreated
                            }
                        />

                    </div>


                </main>

            </div>

        </div>
    )
}


export default OpenAccountPage