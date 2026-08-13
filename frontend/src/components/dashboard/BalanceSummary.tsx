import type { Account } from "../../types/account"
import "./BalanceSummary.css"

import { formatMoney } from "../../utils/formatMoney"


interface BalanceSummaryProps {
    accounts: Account[]
}


function BalanceSummary({
    accounts
}: BalanceSummaryProps) {

    const totalBalance = accounts.reduce(
        (total, account) =>
            total + account.balance,
        0
    )


    const checkingBalance = accounts
        .filter(
            account =>
                account.account_type === "CHECKING"
        )
        .reduce(
            (total, account) =>
                total + account.balance,
            0
        )


    const savingsBalance = accounts
        .filter(
            account =>
                account.account_type === "SAVINGS"
        )
        .reduce(
            (total, account) =>
                total + account.balance,
            0
        )


    return (
        <section
            id="overview"
            className="dashboard-overview"
        >

            <article className="summary-card main-summary">

                <span>
                    Total Balance
                </span>

                <strong>
                    {formatMoney(totalBalance)}
                </strong>

                <div className="summary-breakdown">

                    <div>
                        <span>Checking</span>

                        <b>
                            {formatMoney(
                                checkingBalance
                            )}
                        </b>
                    </div>

                    <div>
                        <span>Savings</span>

                        <b>
                            {formatMoney(
                                savingsBalance
                            )}
                        </b>
                    </div>

                </div>

            </article>


            <article className="summary-card">

                <span>
                    Total Savings
                </span>

                <strong>
                    {formatMoney(
                        savingsBalance
                    )}
                </strong>

                <p className="summary-description">
                    Across your savings accounts
                </p>

            </article>


            <article className="summary-card">

                <span>
                    Total Checking
                </span>

                <strong>
                    {formatMoney(
                        checkingBalance
                    )}
                </strong>

                <p className="summary-description">
                    Available checking balance
                </p>

            </article>

        </section>
    )
}


export default BalanceSummary