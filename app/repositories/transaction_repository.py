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

        if len(self.transactions) == 0:
            new_id = 1
        else:
            new_id = max(
                transaction.id
                for transaction in self.transactions
            ) + 1

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