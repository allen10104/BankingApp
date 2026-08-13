from beanie import PydanticObjectId
from app.models.customer import Customer


class CustomerRepository:
    async def get_all_customers(self):
        return await Customer.find_all().to_list()


    async def get_customer_by_id(self, customer_id: PydanticObjectId):
        return await Customer.get(customer_id)


    async def get_customer_by_username(self, username: str):
        return await Customer.find_one(
            Customer.username == username
        )


    async def create_customer(self, name: str, username: str, password_hash: str):
        customer = Customer(
            name=name,
            username=username,
            password_hash=password_hash
        )

        await customer.insert()
        return customer


    async def update_customer(self, customer_id, customer_data):
        customer = await Customer.get(customer_id)

        if customer is None:
            return None

        customer.name = customer_data.name
        customer.username = customer_data.username

        await customer.save()

        return customer


    async def delete_customer(self, customer_id):

        customer = await Customer.get(customer_id)

        if customer is None:
            return None

        await customer.delete()

        return customer