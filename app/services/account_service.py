class AccountService:

    def __init__(self, account_repository, customer_repository):
        self.account_repository = account_repository
        self.customer_repository = customer_repository

    def create_account(self, account_data):

        customer = self.customer_repository.get_customer_by_id(
            account_data.customer_id
        )

        if customer is None:
            return None

        return self.account_repository.create_account(account_data)

    def get_accounts(self, branch_id=None, min_balance=None):

        return self.account_repository.get_accounts(
            branch_id,
            min_balance
        )