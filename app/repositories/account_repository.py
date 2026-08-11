from app.models.account import Account, AccountCreate


class AccountRepository:

    def __init__(self):
        self.accounts = [
            Account(
                id=1,
                customer_id=1,
                account_type="CHECKING",
                branch_id=123,
                balance=1500.00
            ),
            Account(
                id=2,
                customer_id=2,
                account_type="SAVINGS",
                branch_id=123,
                balance=2500.00
            )
        ]

    def get_account_by_id(self, account_id: int):

        for account in self.accounts:
            if account.id == account_id:
                return account

        return None

    def create_account(self, account_data: AccountCreate):

        if len(self.accounts) == 0:
            new_id = 1
        else:
            new_id = max(account.id for account in self.accounts) + 1

        new_account = Account(
            id=new_id,
            customer_id=account_data.customer_id,
            account_type=account_data.account_type,
            branch_id=account_data.branch_id,
            balance=0.0
        )

        self.accounts.append(new_account)

        return new_account