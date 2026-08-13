import type {
    Account
} from "../../types/account"

import {
    formatMoney
} from "../../utils/formatMoney"

import "./AccountList.css"


interface AccountListProps {
    accounts: Account[]
}


function AccountList({
    accounts
}: AccountListProps) {

    return (
        <section className="accounts-list-panel">

            <div className="accounts-panel-heading">

                <div>

                    <h2>
                        Your Accounts
                    </h2>

                    <p>
                        View your checking and
                        savings accounts.
                    </p>

                </div>

                <span>
                    {accounts.length} total
                </span>

            </div>


            {accounts.length === 0 ? (

                <div className="accounts-empty">

                    <div className="accounts-empty-icon">
                        ▣
                    </div>

                    <h3>
                        No accounts found
                    </h3>

                    <p>
                        Open a checking or savings
                        account to get started.
                    </p>

                </div>

            ) : (

                <div className="accounts-card-grid">

                    {accounts.map(
                        account => (

                            <article
                                className={
                                    `full-account-card ${
                                        account.account_type
                                            .toLowerCase()
                                    }`
                                }
                                key={account.id}
                            >

                                <div className="full-account-top">

                                    <div>

                                        <span className="full-account-type">

                                            {account.account_type ===
                                            "CHECKING"
                                                ? "Checking"
                                                : "Savings"}

                                        </span>

                                        <p>
                                            Branch{" "}
                                            {account.branch_id}
                                        </p>

                                    </div>

                                    <span className="account-menu">
                                        •••
                                    </span>

                                </div>


                                <div className="full-account-number">

                                    <span>
                                        Account Number
                                    </span>

                                    <strong>
                                        ••••{" "}
                                        {account.account_number.slice(
                                            -4
                                        )}
                                    </strong>

                                </div>


                                <div className="full-account-balance">

                                    <span>
                                        Available Balance
                                    </span>

                                    <strong>
                                        {formatMoney(
                                            account.balance
                                        )}
                                    </strong>

                                </div>

                            </article>

                        )
                    )}

                </div>

            )}

        </section>
    )
}


export default AccountList