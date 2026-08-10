from account import Account
from transaction import Transaction

class SavingsAccount(Account, Transaction):
    def __init__(self, account_id, balance):
        super().__init__(account_id, balance)

        self.account_type = "Savings"

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            return True

        return False

    def __str__(self):
        return (
            f"Savings Account {self.account_id} | "
            f"Balance: ${self.balance:.2f}"
        )