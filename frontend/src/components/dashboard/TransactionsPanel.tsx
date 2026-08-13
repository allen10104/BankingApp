import type { Account } from "../../types/account"
import type { Transaction } from "../../types/transaction"

import { formatMoney } from "../../utils/formatMoney"
import "./DashboardPanel.css"
import "./TransactionsPanel.css"


interface TransactionsPanelProps {
    accounts: Account[]
    transactions: Transaction[]
}


function TransactionsPanel({
    accounts,
    transactions
}: TransactionsPanelProps) {


    function getAccountLabel(
        accountId: string
    ) {

        const account = accounts.find(
            account =>
                account.id === accountId
        )

        if (account === undefined) {
            return "Account"
        }

        const type =
            account.account_type === "CHECKING"
                ? "Checking"
                : "Savings"

        return (
            `${type} •••• ${account.account_number.slice(-4)}`
        )
    }


    return (
        <section
            id="transactions"
            className="dashboard-panel transactions-panel"
        >

            <div className="panel-heading">

                <h2>
                    Transactions
                </h2>

                <span>
                    Recent activity
                </span>

            </div>


            {transactions.length === 0 ? (

                <div className="dashboard-empty">

                    <strong>
                        No transactions yet
                    </strong>

                    <p>
                        Your recent banking
                        activity will appear here.
                    </p>

                </div>

            ) : (

                <div className="dashboard-transaction-list">

                    {transactions
                        .slice(0, 8)
                        .map(transaction => (

                            <article
                                className="dashboard-transaction"
                                key={transaction.id}
                            >

                                <div className="transaction-circle">
                                    ⇄
                                </div>


                                <div className="transaction-main">

                                    <strong>
                                        Transfer
                                    </strong>

                                    <span>

                                        {getAccountLabel(
                                            transaction.from_account_id
                                        )}

                                        {" → "}

                                        {getAccountLabel(
                                            transaction.to_account_id
                                        )}

                                    </span>

                                </div>


                                <div className="transaction-right">

                                    <strong>
                                        {formatMoney(
                                            transaction.amount
                                        )}
                                    </strong>

                                    <span>

                                        {new Date(
                                            transaction.created_at
                                        ).toLocaleDateString()}

                                    </span>

                                </div>

                            </article>

                        ))}

                </div>

            )}

        </section>
    )
}


export default TransactionsPanel