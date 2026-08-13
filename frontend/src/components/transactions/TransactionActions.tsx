import type {
    TransactionType
} from "../../types/transaction"

import "./TransactionActions.css"


interface TransactionActionsProps {
    selectedType: TransactionType | null

    onSelect:
        (type: TransactionType) => void
}


function TransactionActions({
    selectedType,
    onSelect
}: TransactionActionsProps) {

    return (
        <section className="transaction-actions">

            <button
                className={
                    `transaction-action-card deposit ${
                        selectedType === "DEPOSIT"
                            ? "selected"
                            : ""
                    }`
                }
                onClick={() =>
                    onSelect("DEPOSIT")
                }
            >

                <div className="transaction-action-icon">
                    ↓
                </div>

                <div className="transaction-action-content">

                    <h3>
                        Deposit
                    </h3>

                    <p>
                        Add money to one of
                        your accounts.
                    </p>

                </div>

                <span className="transaction-action-arrow">
                    →
                </span>

            </button>


            <button
                className={
                    `transaction-action-card withdraw ${
                        selectedType === "WITHDRAW"
                            ? "selected"
                            : ""
                    }`
                }
                onClick={() =>
                    onSelect("WITHDRAW")
                }
            >

                <div className="transaction-action-icon">
                    ↑
                </div>

                <div className="transaction-action-content">

                    <h3>
                        Withdraw
                    </h3>

                    <p>
                        Remove funds from one
                        of your accounts.
                    </p>

                </div>

                <span className="transaction-action-arrow">
                    →
                </span>

            </button>


            <button
                className={
                    `transaction-action-card transfer ${
                        selectedType === "TRANSFER"
                            ? "selected"
                            : ""
                    }`
                }
                onClick={() =>
                    onSelect("TRANSFER")
                }
            >

                <div className="transaction-action-icon">
                    ⇄
                </div>

                <div className="transaction-action-content">

                    <h3>
                        Transfer
                    </h3>

                    <p>
                        Move money between
                        your accounts.
                    </p>

                </div>

                <span className="transaction-action-arrow">
                    →
                </span>

            </button>

        </section>
    )
}

export default TransactionActions