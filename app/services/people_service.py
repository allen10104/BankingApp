from app.models.customer import (
    CustomerDirectoryItem,
    DirectoryAccount
)


class PeopleService:

    def __init__(
        self,
        customer_repository,
        account_repository
    ):
        self.customer_repository = customer_repository
        self.account_repository = account_repository


    async def get_people(self):

        customers = (
            await self.customer_repository.get_all_customers()
        )

        people = []


        for customer in customers:

            accounts = (
                await self.account_repository.get_accounts(
                    customer.id
                )
            )


            directory_accounts = []

            for account in accounts:

                directory_accounts.append(
                    DirectoryAccount(
                        account_id=str(account.id),
                        account_type=account.account_type,
                        last_four=account.account_number[-4:]
                    )
                )


            people.append(
                CustomerDirectoryItem(
                    id=str(customer.id),
                    name=customer.name,
                    username=customer.username,
                    accounts=directory_accounts
                )
            )


        return people