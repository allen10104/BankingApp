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

    const location = useLocation()


    const isDashboard =
        location.pathname ===
        "/dashboard"


    const isAccounts =
        location.pathname ===
        "/accounts"


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
                                isDashboard &&
                                !location.hash
                                    ? "active"
                                    : ""
                            }`
                        }
                    >
                        <span>⌂</span>
                        Dashboard
                    </Link>


                    <Link
                        to="/dashboard#transfer"
                        className={
                            `dashboard-nav-link ${
                                location.hash ===
                                "#transfer"
                                    ? "active"
                                    : ""
                            }`
                        }
                    >
                        <span>⇄</span>
                        Transfer
                    </Link>


                    <Link
                        to="/dashboard#transactions"
                        className={
                            `dashboard-nav-link ${
                                location.hash ===
                                "#transactions"
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