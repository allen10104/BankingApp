from uuid import uuid4


class AccountService:

    def __init__(self, account_repository):
        self.account_repository = account_repository


    async def create_account(self, customer_id, account_data):
        account_number = (uuid4().hex[:12].upper())

        return await self.account_repository.create_account(customer_id, account_data,account_number)


    async def get_accounts(self, customer_id, branch_id=None, min_balance=None):
        return await self.account_repository.get_accounts(customer_id, branch_id, min_balance)