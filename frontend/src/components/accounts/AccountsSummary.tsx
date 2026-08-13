import type {
    Account
} from "../../types/account"

import {
    formatMoney
} from "../../utils/formatMoney"

import "./AccountsSummary.css"


interface AccountsSummaryProps {
    accounts: Account[]
}


function AccountsSummary({
    accounts
}: AccountsSummaryProps) {

    const checkingAccounts =
        accounts.filter(
            account =>
                account.account_type ===
                "CHECKING"
        )


    const savingsAccounts =
        accounts.filter(
            account =>
                account.account_type ===
                "SAVINGS"
        )


    const totalBalance =
        accounts.reduce(
            (total, account) =>
                total + account.balance,
            0
        )


    return (
        <section className="accounts-summary">

            <article className="account-summary-card">

                <span>
                    Total Accounts
                </span>

                <strong>
                    {accounts.length}
                </strong>

                <p>
                    Active bank accounts
                </p>

            </article>


            <article className="account-summary-card lavender">

                <span>
                    Checking
                </span>

                <strong>
                    {checkingAccounts.length}
                </strong>

                <p>
                    Checking accounts
                </p>

            </article>


            <article className="account-summary-card peach">

                <span>
                    Savings
                </span>

                <strong>
                    {savingsAccounts.length}
                </strong>

                <p>
                    Savings accounts
                </p>

            </article>


            <article className="account-summary-card blue">

                <span>
                    Combined Balance
                </span>

                <strong>
                    {formatMoney(
                        totalBalance
                    )}
                </strong>

                <p>
                    Across all accounts
                </p>

            </article>

        </section>
    )
}


export default AccountsSummary