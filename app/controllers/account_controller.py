from fastapi import APIRouter, HTTPException
from starlette import status

from app.dependencies import account_service
from app.models.account import Account, AccountCreate


router = APIRouter(
    prefix="/api/v1/accounts",
    tags=["Accounts"]
)


@router.post("", response_model=Account, status_code=status.HTTP_201_CREATED)
async def create_account(account_data: AccountCreate):
    account = await account_service.create_account(account_data)

    if account is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )

    return account


@router.get("", response_model=list[Account])
async def get_accounts(
    branch_id: int | None = None,
    min_balance: float | None = None
):

    return await account_service.get_accounts(
        branch_id,
        min_balance
    )