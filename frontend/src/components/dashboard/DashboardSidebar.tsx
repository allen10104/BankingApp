import {
    Link,
    useLocation
} from "react-router"

import "./DashboardSidebar.css"


interface DashboardSidebarProps {
    onLogout: () => void
}


function DashboardSidebar({
    onLogout
}: DashboardSidebarProps) {

    const location =
        useLocation()


    const params =
        new URLSearchParams(
            location.search
        )


    const transactionType =
        params.get("type")


    const isDashboard =
        location.pathname ===
        "/dashboard"


    const isTransfer =
        location.pathname ===
        "/transactions"
        &&
        transactionType ===
        "TRANSFER"


    const isTransactions =
        location.pathname ===
        "/transactions"
        &&
        transactionType !==
        "TRANSFER"


    const isAccounts =
        location.pathname.startsWith(
            "/accounts"
        )


    return (
        <aside className="dashboard-sidebar">

            <div>

                <Link
                    className="dashboard-logo"
                    to="/dashboard"
                >
                    The Bank
                </Link>


                <nav className="dashboard-nav">

                    <Link
                        to="/dashboard"
                        className={
                            `dashboard-nav-link ${
                                isDashboard
                                    ? "active"
                                    : ""
                            }`
                        }
                    >
                        <span>⌂</span>

                        Dashboard
                    </Link>


                    <Link
                        to="/transactions?type=TRANSFER"
                        className={
                            `dashboard-nav-link ${
                                isTransfer
                                    ? "active"
                                    : ""
                            }`
                        }
                    >
                        <span>⇄</span>

                        Transfer
                    </Link>


                    <Link
                        to="/transactions"
                        className={
                            `dashboard-nav-link ${
                                isTransactions
                                    ? "active"
                                    : ""
                            }`
                        }
                    >
                        <span>≡</span>

                        Transactions
                    </Link>


                    <Link
                        to="/accounts"
                        className={
                            `dashboard-nav-link ${
                                isAccounts
                                    ? "active"
                                    : ""
                            }`
                        }
                    >
                        <span>▣</span>

                        Accounts
                    </Link>

                </nav>

            </div>


            <button
                className="dashboard-logout"
                onClick={onLogout}
            >
                <span>↪</span>

                Log Out
            </button>

        </aside>
    )
}


export default DashboardSidebar