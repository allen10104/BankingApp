from app.security import (
    create_access_token,
    verify_password
)


class AuthService:
    def __init__(self, customer_repository):
        self.customer_repository = customer_repository


    async def login(self, login_data):

        customer = (
            await self.customer_repository.get_customer_by_username(
                login_data.username
            )
        )

        if customer is None:
            return None

        if not verify_password(
            login_data.password,
            customer.password_hash
        ):
            return None

        return create_access_token(
            str(customer.id)
        )