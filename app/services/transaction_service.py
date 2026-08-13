class TransactionService:

    def __init__(self, account_repository, transaction_repository):
        self.account_repository = account_repository
        self.transaction_repository = transaction_repository


    async def transfer(self, customer_id, transfer_data):
        if transfer_data.amount <= 0:
            return "Transfer amount must be greater than 0"

        if transfer_data.from_account_id == transfer_data.to_account_id:
            return "Cannot transfer to the same account"

        from_account = (await self.account_repository.get_account_by_id(transfer_data.from_account_id))

        to_account = (
            await self.account_repository.get_account_by_id(
                transfer_data.to_account_id
            )
        )

        if from_account is None or to_account is None:
            return "Account not found"

        if from_account.customer_id != customer_id or to_account.customer_id != customer_id:
            return "You can only transfer between your own accounts"

        if from_account.balance < transfer_data.amount:
            return "Insufficient funds"

        from_account.balance -= transfer_data.amount
        to_account.balance += transfer_data.amount

        await self.account_repository.save_account(from_account)

        await self.account_repository.save_account(to_account)

        return await self.transaction_repository.create_transfer(
            from_account.id,
            to_account.id,
            transfer_data.amount
        )


    async def get_transactions(self, customer_id, start_date=None, transaction_type=None):
        accounts = await self.account_repository.get_accounts(customer_id)

        account_ids = [account.id for account in accounts]

        return await self.transaction_repository.get_transactions(account_ids, start_date, transaction_type)