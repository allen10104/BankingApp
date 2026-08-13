from fastapi import (
    APIRouter,
    Depends
)

from starlette import status

from app.dependencies import (account_service, get_current_customer)

from app.models.account import (Account, AccountCreate)

from app.models.customer import Customer


router = APIRouter(
    prefix="/api/v1/accounts",
    tags=["Accounts"]
)


@router.post("", response_model=Account, status_code=status.HTTP_201_CREATED)
async def create_account(
    account_data: AccountCreate,
    current_customer: Customer = Depends(get_current_customer)):

    return await account_service.create_account(
        current_customer.id,
        account_data
    )


@router.get("", response_model=list[Account])
async def get_accounts(
    branch_id: int | None = None,
    min_balance: float | None = None,

    current_customer: Customer = Depends(get_current_customer)
):

    return await account_service.get_accounts(
        current_customer.id,
        branch_id,
        min_balance
    )