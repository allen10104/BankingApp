from user import User

class Customer(User):
    def __init__(self, customer_id, name, username, password):
        super().__init__(username, password)

        self.customer_id = customer_id
        self.name = name
        self.accounts = []

    def get_id(self):
        return self.customer_id

    def set_id(self, customer_id):
        self.customer_id = customer_id

    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name

    def get_accounts(self):
        return self.accounts

    def add_account(self, account):
        self.accounts.append(account)

    def __str__(self):
        return f"Customer ID: {self.customer_id}, Name: {self.name}"