from fastapi import Depends, HTTPException
from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer
)
from starlette import status

from beanie import PydanticObjectId

from app.repositories.account_repository import AccountRepository
from app.repositories.customer_repository import CustomerRepository
from app.repositories.transaction_repository import TransactionRepository

from app.services.account_service import AccountService
from app.services.auth_service import AuthService
from app.services.customer_service import CustomerService
from app.services.transaction_service import TransactionService

from app.security import decode_access_token


customer_repository = CustomerRepository()
account_repository = AccountRepository()
transaction_repository = TransactionRepository()


customer_service = CustomerService(
    customer_repository
)

auth_service = AuthService(customer_repository)
account_service = AccountService(account_repository)
transaction_service = TransactionService(account_repository, transaction_repository)

bearer_scheme = HTTPBearer()

async def get_current_customer(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)
):

    customer_id = decode_access_token(credentials.credentials)

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={
            "WWW-Authenticate": "Bearer"
        }
    )

    if customer_id is None:
        raise credentials_exception

    try:
        object_id = PydanticObjectId(customer_id)

    except Exception:
        raise credentials_exception

    customer = await customer_service.get_customer_by_id(object_id)

    if customer is None:
        raise credentials_exception

    return customer