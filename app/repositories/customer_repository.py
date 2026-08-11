from beanie import PydanticObjectId

from app.models.customer import (
    Customer,
    CustomerCreateAndUpdate
)


class CustomerRepository:
    async def get_all_customers(self):
        return await Customer.find_all().to_list()


    async def get_customer_by_id(self, customer_id: PydanticObjectId):
        return await Customer.get(customer_id)


    async def create_customer(self, customer_data: CustomerCreateAndUpdate):
        customer = Customer(
            name=customer_data.name,
            username=customer_data.username
        )

        await customer.insert()
        return customer


    async def update_customer(self, customer_id: PydanticObjectId,customer_data: CustomerCreateAndUpdate):
        customer = await Customer.get(customer_id)

        if customer is None:
            return None

        customer.name = customer_data.name
        customer.username = customer_data.username

        await customer.save()

        return customer


    async def delete_customer(self,customer_id: PydanticObjectId):
        customer = await Customer.get(customer_id)

        if customer is None:
            return None

        await customer.delete()

        return customer