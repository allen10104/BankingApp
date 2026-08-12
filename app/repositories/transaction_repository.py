from datetime import datetime, time, timezone
from app.models.transaction import Transaction


class TransactionRepository:
    async def create_transfer(self, from_account_id, to_account_id, amount):

        transaction = Transaction(
            from_account_id=from_account_id,
            to_account_id=to_account_id,
            amount=amount
        )

        await transaction.insert()
        return transaction


    async def get_transactions(self, start_date=None, transaction_type=None):
        filters = {}
        if start_date is not None:
            start_datetime = datetime.combine(
                start_date,
                time.min,
                tzinfo=timezone.utc
            )

            filters["created_at"] = {"$gte": start_datetime}

        if transaction_type is not None:
            filters["transaction_type"] = (transaction_type.upper())

        return await Transaction.find(filters).to_list()