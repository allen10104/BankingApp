import "./DashboardSidebar.css"

interface DashboardSidebarProps {
    onLogout: () => void
}


function DashboardSidebar({
    onLogout
}: DashboardSidebarProps) {

    return (
        <aside className="dashboard-sidebar">

            <div>

                <h2 className="dashboard-logo">
                    The Bank
                </h2>

                <nav className="dashboard-nav">

                    <a
                        href="#overview"
                        className="dashboard-nav-link active"
                    >
                        <span>⌂</span>
                        Dashboard
                    </a>

                    <a
                        href="#transfer"
                        className="dashboard-nav-link"
                    >
                        <span>⇄</span>
                        Transfer
                    </a>

                    <a
                        href="#transactions"
                        className="dashboard-nav-link"
                    >
                        <span>≡</span>
                        Transactions
                    </a>

                    <a
                        href="#accounts"
                        className="dashboard-nav-link"
                    >
                        <span>▣</span>
                        Accounts
                    </a>

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