from abc import ABC, abstractmethod


class Account(ABC):
    def __init__(self, account_id, balance):
        self.account_id = account_id
        self.balance = balance

    def get_balance(self):
        return self.balance

    def get_id(self):
        return self.account_id

