from datetime import datetime, timezone

from app.models.transaction import Transaction


class TransactionRepository:

    def __init__(self):
        self.transactions = []

    def create_transfer(
        self,
        from_account_id: int,
        to_account_id: int,
        amount: float
    ):

        new_id = len(self.transactions) + 1

        transaction = Transaction(
            id=new_id,
            transaction_type="TRANSFER",
            from_account_id=from_account_id,
            to_account_id=to_account_id,
            amount=amount,
            created_at=datetime.now(timezone.utc)
        )

        self.transactions.append(transaction)

        return transaction

    def get_transactions(
        self,
        start_date=None,
        transaction_type=None
    ):

        filtered_transactions = []

        for transaction in self.transactions:

            if start_date is not None:

                if transaction.created_at.date() < start_date:
                    continue

            if transaction_type is not None:

                if transaction.transaction_type != transaction_type.upper():
                    continue

            filtered_transactions.append(transaction)

        return filtered_transactions