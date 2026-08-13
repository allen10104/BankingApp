import type { Account } from "../../types/account"

import { formatMoney } from "../../utils/formatMoney"
import "./DashboardPanel.css"
import "./AccountsPanel.css"

interface AccountsPanelProps {
    accounts: Account[]
}


function AccountsPanel({
    accounts
}: AccountsPanelProps) {

    return (
        <section
            id="accounts"
            className="dashboard-panel"
        >

            <div className="panel-heading">

                <h2>
                    Your Accounts
                </h2>

                <span>
                    {accounts.length} total
                </span>

            </div>


            {accounts.length === 0 ? (

                <div className="dashboard-empty">

                    <strong>
                        No accounts yet
                    </strong>

                    <p>
                        Your checking and savings
                        accounts will appear here.
                    </p>

                </div>

            ) : (

                <div className="dashboard-account-grid">

                    {accounts.map(account => (

                        <article
                            className="dashboard-account-card"
                            key={account.id}
                        >

                            <div className="account-top-row">

                                <span className="account-type-badge">

                                    {account.account_type ===
                                    "CHECKING"
                                        ? "Checking"
                                        : "Savings"}

                                </span>

                                <span>
                                    •••
                                </span>

                            </div>


                            <p className="dashboard-account-number">

                                ••••{" "}
                                {account.account_number.slice(
                                    -4
                                )}

                            </p>


                            <span className="account-balance-label">
                                Available Balance
                            </span>


                            <strong className="dashboard-account-balance">

                                {formatMoney(
                                    account.balance
                                )}

                            </strong>

                        </article>

                    ))}

                </div>

            )}

        </section>
    )
}


export default AccountsPanel