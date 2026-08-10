from account import Account
from transaction import Transaction


class CheckingAccount(Account, Transaction):
    def __init__(self, account_id, balance, overdraft_limit=500):
        super().__init__(account_id, balance)

        self.account_type = "Checking"
        self.overdraft_limit = overdraft_limit

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount

    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft_limit:
            self.balance -= amount
            return True

        return False

    def __str__(self):
        return (
            f"Checking Account {self.account_id} | "
            f"Balance: ${self.balance:.2f}"
        )