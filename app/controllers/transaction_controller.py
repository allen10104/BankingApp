from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from starlette import status

from app.dependencies import (
    transaction_service,
    get_current_customer
)

from app.models.customer import Customer

from app.models.transaction import (
    Transaction,
    TransactionCreate
)


router = APIRouter(
    prefix="/api/v1/transactions",
    tags=["Transactions"]
)


@router.post(
    "",
    response_model=Transaction,
    status_code=status.HTTP_201_CREATED
)
async def create_transaction(
    transaction_data: TransactionCreate,
    current_customer: Customer = Depends(
        get_current_customer
    )
):

    result = await transaction_service.create_transaction(
        current_customer.id,
        transaction_data
    )


    if isinstance(result, str):
        if result == "Account not found":

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=result
            )


        if (
            result == "You can only deposit into your own accounts"
            or result == "You can only withdraw from your own accounts"
            or result == "You can only transfer between your own accounts"
        ):

            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=result
            )


        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result
        )


    return result


@router.get("", response_model=list[Transaction], status_code=status.HTTP_200_OK)
async def get_transactions(
    start_date: date | None = None,
    transaction_type: str | None = None,
    current_customer: Customer = Depends(
        get_current_customer
    )
):

    return await transaction_service.get_transactions(
        current_customer.id,
        start_date,
        transaction_type
    )