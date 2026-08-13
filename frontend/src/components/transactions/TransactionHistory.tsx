import type {
    Account
} from "../../types/account"

import type {
    Transaction
} from "../../types/transaction"

import {
    formatMoney
} from "../../utils/formatMoney"

import "./TransactionHistory.css"


interface TransactionHistoryProps {
    accounts: Account[]
    transactions: Transaction[]
}


function TransactionHistory({
    accounts,
    transactions
}: TransactionHistoryProps) {


    function getAccountLabel(
        accountId: string | null
    ) {

        if (accountId === null) {
            return ""
        }


        const account =
            accounts.find(
                account =>
                    account.id === accountId
            )


        if (account === undefined) {

            return "Account"
        }


        const type =
            account.account_type ===
            "CHECKING"
                ? "Checking"
                : "Savings"


        return (
            `${type} •••• ${
                account.account_number.slice(-4)
            }`
        )
    }


    return (
        <section className="transaction-history-panel">

            <div className="transaction-history-header">

                <div>

                    <h2>
                        Transaction History
                    </h2>

                    <p>
                        Your recent banking activity.
                    </p>

                </div>

                <span>
                    {transactions.length} total
                </span>

            </div>


            {transactions.length === 0 ? (

                <div className="transaction-history-empty">

                    <div>
                        ≡
                    </div>

                    <h3>
                        No transactions yet
                    </h3>

                    <p>
                        Deposits, withdrawals,
                        and transfers will appear here.
                    </p>

                </div>

            ) : (

                <div className="transaction-history-list">

                    {transactions.map(
                        transaction => {

                            const isDeposit =
                                transaction.transaction_type ===
                                "DEPOSIT"

                            const isWithdraw =
                                transaction.transaction_type ===
                                "WITHDRAW"


                            const title =
                                isDeposit
                                    ? "Deposit"
                                    : isWithdraw
                                        ? "Withdrawal"
                                        : "Transfer"


                            const icon =
                                isDeposit
                                    ? "↓"
                                    : isWithdraw
                                        ? "↑"
                                        : "⇄"


                            const style =
                                isDeposit
                                    ? "positive"
                                    : isWithdraw
                                        ? "negative"
                                        : "neutral"


                            let description = ""


                            if (isDeposit) {

                                description =
                                    getAccountLabel(
                                        transaction.to_account_id
                                    )

                            } else if (isWithdraw) {

                                description =
                                    getAccountLabel(
                                        transaction.from_account_id
                                    )

                            } else {

                                description =
                                    `${getAccountLabel(
                                        transaction.from_account_id
                                    )} → ${getAccountLabel(
                                        transaction.to_account_id
                                    )}`
                            }


                            return (

                                <article
                                    className="transaction-history-row"
                                    key={
                                        transaction.id
                                    }
                                >

                                    <div
                                        className={
                                            `history-icon ${style}`
                                        }
                                    >
                                        {icon}
                                    </div>


                                    <div className="history-details">

                                        <strong>
                                            {title}
                                        </strong>

                                        <span>
                                            {description}
                                        </span>

                                    </div>


                                    <span className="history-date">

                                        {new Date(
                                            transaction.created_at
                                        ).toLocaleDateString()}

                                    </span>


                                    <strong
                                        className={
                                            `history-amount ${style}`
                                        }
                                    >

                                        {isDeposit && "+"}

                                        {isWithdraw && "-"}

                                        {formatMoney(
                                            transaction.amount
                                        )}

                                    </strong>

                                </article>

                            )
                        }
                    )}

                </div>

            )}

        </section>
    )
}


export default TransactionHistory