class TransactionService:

    def __init__(self, account_repository, transaction_repository):
        self.account_repository = account_repository
        self.transaction_repository = transaction_repository


    async def create_transaction(self, customer_id, transaction_data):

        if transaction_data.amount <= 0:
            return "Transaction amount must be greater than 0"

        if transaction_data.transaction_type == "DEPOSIT":
            return await self.deposit(
                customer_id,
                transaction_data
            )

        if transaction_data.transaction_type == "WITHDRAW":
            return await self.withdraw(
                customer_id,
                transaction_data
            )

        if transaction_data.transaction_type == "TRANSFER":
            return await self.transfer(
                customer_id,
                transaction_data
            )


    async def deposit(self, customer_id, transaction_data):

        if transaction_data.account_id is None:
            return "Account is required"

        account = await self.account_repository.get_account_by_id(
            transaction_data.account_id
        )

        if account is None:
            return "Account not found"

        if account.customer_id != customer_id:
            return "You can only deposit into your own accounts"

        account.balance += transaction_data.amount

        await self.account_repository.save_account(
            account
        )

        return await self.transaction_repository.create_transaction(
            transaction_type="DEPOSIT",
            amount=transaction_data.amount,
            to_account_id=account.id
        )


    async def withdraw(self, customer_id, transaction_data):

        if transaction_data.account_id is None:
            return "Account is required"

        account = await self.account_repository.get_account_by_id(
            transaction_data.account_id
        )

        if account is None:
            return "Account not found"

        if account.customer_id != customer_id:
            return "You can only withdraw from your own accounts"

        if account.balance < transaction_data.amount:
            return "Insufficient funds"

        account.balance -= transaction_data.amount

        await self.account_repository.save_account(
            account
        )

        return await self.transaction_repository.create_transaction(
            transaction_type="WITHDRAW",
            amount=transaction_data.amount,
            from_account_id=account.id
        )


    async def transfer(self, customer_id, transaction_data):

        if (
            transaction_data.from_account_id is None
            or transaction_data.to_account_id is None
        ):
            return "Both accounts are required"

        if (
            transaction_data.from_account_id
            == transaction_data.to_account_id
        ):
            return "Cannot transfer to the same account"

        from_account = await self.account_repository.get_account_by_id(
            transaction_data.from_account_id
        )

        to_account = await self.account_repository.get_account_by_id(
            transaction_data.to_account_id
        )

        if from_account is None or to_account is None:
            return "Account not found"

        if (
            from_account.customer_id != customer_id
            or to_account.customer_id != customer_id
        ):
            return "You can only transfer between your own accounts"

        if from_account.balance < transaction_data.amount:
            return "Insufficient funds"

        from_account.balance -= transaction_data.amount
        to_account.balance += transaction_data.amount

        await self.account_repository.save_account(
            from_account
        )

        await self.account_repository.save_account(
            to_account
        )

        return await self.transaction_repository.create_transaction(
            transaction_type="TRANSFER",
            amount=transaction_data.amount,
            from_account_id=from_account.id,
            to_account_id=to_account.id
        )


    async def get_transactions(
        self,
        customer_id,
        start_date=None,
        transaction_type=None
    ):

        accounts = await self.account_repository.get_accounts(
            customer_id
        )

        account_ids = [
            account.id
            for account in accounts
        ]

        return await self.transaction_repository.get_transactions(
            account_ids,
            start_date,
            transaction_type
        )