import type {
    Person
} from "../../types/people"

import "./PersonCard.css"


interface PersonCardProps {
    person: Person
    isCurrentUser: boolean
}


function PersonCard({
    person,
    isCurrentUser
}: PersonCardProps) {

    return (
        <article className="person-card">

            <div className="person-card-header">

                <div className="person-avatar">

                    {person.name
                        .charAt(0)
                        .toUpperCase()}

                </div>


                <div className="person-identity">

                    <div className="person-name-row">

                        <h3>
                            {person.name}
                        </h3>


                        {isCurrentUser && (

                            <span className="person-you-badge">
                                You
                            </span>

                        )}

                    </div>


                    <span>
                        @{person.username}
                    </span>

                </div>

            </div>


            <div className="person-divider" />


            <div className="person-accounts-heading">

                <span>
                    ACCOUNTS
                </span>

                <strong>
                    {person.accounts.length}
                </strong>

            </div>


            {person.accounts.length === 0 ? (

                <div className="person-no-accounts">

                    No accounts available

                </div>

            ) : (

                <div className="person-account-list">

                    {person.accounts.map(
                        account => (

                            <div
                                className="person-account"
                                key={
                                    account.account_id
                                }
                            >

                                <div
                                    className={
                                        `person-account-icon ${
                                            account.account_type
                                                .toLowerCase()
                                        }`
                                    }
                                >
                                    ▣
                                </div>


                                <div>

                                    <strong>

                                        {
                                            account.account_type ===
                                            "CHECKING"
                                                ? "Checking"
                                                : "Savings"
                                        }

                                    </strong>


                                    <span>
                                        •••• {account.last_four}
                                    </span>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </article>
    )
}


export default PersonCard