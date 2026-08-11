from app.models.customer import Customer, CustomerCreateAndUpdate


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

    def get_customer_by_id(self, customer_id: int):

        for customer in self.customers:

            if customer.id == customer_id:
                return customer

        return None

    def create_customer(self, customer_data: CustomerCreateAndUpdate):
        new_id = max(customer.id for customer in self.customers) + 1

        new_customer = Customer(
            id = new_id,
            name = customer_data.name,
            username = customer_data.username
        )

        self.customers.append(new_customer)
        return new_customer

    def delete_customer(self, customer_id: int):
        for customer in self.customers:
            if customer.id == customer_id:
                self.customers.remove(customer)
                return customer

        return None

    def update_customer(self, customer_id: int, customer_data: CustomerCreateAndUpdate):

        for customer in self.customers:
            if customer.id == customer_id:
                customer.name = customer_data.name
                customer.username = customer_data.username
                return customer

        return None