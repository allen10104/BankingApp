from app.models.customer import Customer


class CustomerRepository:

    def __init__(self):
        self.customers = [
            Customer(
                id=1,
                name="John",
                username="john"
            ),
            Customer(
                id=2,
                name="Sarah",
                username="sarah"
            ),
            Customer(
                id=3,
                name="Mike",
                username="mike"
            )
        ]

    def get_all_customers(self):
        return self.customers

    def get_customer_by_id(self, customer_id):

        for customer in self.customers:

            if customer.id == customer_id:
                return customer

        return None