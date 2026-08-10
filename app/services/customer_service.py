from app.repositories.customer_repository import CustomerRepository


class CustomerService:

    def __init__(self, customer_repository):
        self.customer_repository = customer_repository

    def get_all_customers(self):
        return self.customer_repository.get_all_customers()

    def get_customer_by_id(self, customer_id):
        return self.customer_repository.get_customer_by_id(customer_id)