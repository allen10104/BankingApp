from fastapi import APIRouter, HTTPException
from starlette import status

from app.dependencies import account_service
from app.models.account import Account, AccountCreate


router = APIRouter(
    prefix="/api/v1/accounts",
    tags=["Accounts"]
)


@router.post(
    "",
    response_model=Account,
    status_code=status.HTTP_201_CREATED
)
def create_account(account_data: AccountCreate):

    account = account_service.create_account(account_data)

    if account is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )

    return account


@router.get(
    "",
    response_model=list[Account],
    status_code=status.HTTP_200_OK
)
def get_accounts(
    branch_id: int | None = None,
    min_balance: float | None = None
):

    return account_service.get_accounts(
        branch_id,
        min_balance
    )