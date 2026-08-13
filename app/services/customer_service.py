from app.security import hash_password


class CustomerService:
    def __init__(self, customer_repository):
        self.customer_repository = customer_repository


    async def get_all_customers(self):
        return await self.customer_repository.get_all_customers()


    async def get_customer_by_id(self, customer_id):
        return await self.customer_repository.get_customer_by_id(
            customer_id
        )


    async def create_customer(self, customer_data):
        existing_customer = (
            await self.customer_repository.get_customer_by_username(
                customer_data.username
            )
        )

        if existing_customer is not None:
            return "Username already exists"

        hashed_password = hash_password(customer_data.password)

        return await self.customer_repository.create_customer(
            customer_data.name,
            customer_data.username,
            hashed_password
        )


    async def update_customer(self, customer_id, customer_data):
        return await self.customer_repository.update_customer(customer_id, customer_data)


    async def delete_customer(self, customer_id):
        return await self.customer_repository.delete_customer(customer_id)