from datetime import date

from fastapi import APIRouter, HTTPException, Query
from starlette import status

from app.dependencies import transaction_service
from app.models.transaction import Transaction, TransferCreate


router = APIRouter(
    prefix="/api/v1/transactions",
    tags=["Transactions"]
)


@router.post(
    "/transfer",
    response_model=Transaction,
    status_code=status.HTTP_200_OK
)
def transfer_money(transfer_data: TransferCreate):

    result = transaction_service.transfer(transfer_data)

    if isinstance(result, str):

        if result == "Account not found":
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=result
            )

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result
        )

    return result


@router.get(
    "",
    response_model=list[Transaction],
    status_code=status.HTTP_200_OK
)
def get_transactions(
    start_date: date | None = None,
    transaction_type: str | None = Query(
        default=None,
        alias="type"
    )
):

    return transaction_service.get_transactions(
        start_date,
        transaction_type
    )