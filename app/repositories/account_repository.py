from beanie import PydanticObjectId
from app.models.account import Account, AccountCreate


class AccountRepository:
    async def get_account_by_id(self, account_id: PydanticObjectId):
        return await Account.get(account_id)

    async def create_account(self, customer_id, account_data, account_number):
        account = Account(
            customer_id=customer_id,
            account_number=account_number,
            account_type=account_data.account_type,
            branch_id=account_data.branch_id,
            balance=0.0
        )
        await account.insert()

        return account

    async def get_accounts(self, customer_id, branch_id=None, min_balance=None):
        filters = {"customer_id": customer_id}

        if branch_id is not None:
            filters["branch_id"] = branch_id

        if min_balance is not None:
            filters["balance"] = {"$gte": min_balance}

        return await Account.find(filters).to_list()


    async def save_account(self, account):
        await account.save()
        return account