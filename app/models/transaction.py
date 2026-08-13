from datetime import datetime, timezone
from typing import Annotated, Literal

from beanie import Document, Indexed, PydanticObjectId
from pydantic import BaseModel, Field


class TransactionCreate(BaseModel):

    transaction_type: Literal[
        "DEPOSIT",
        "WITHDRAW",
        "TRANSFER"
    ]

    amount: float

    account_id: PydanticObjectId | None = None

    from_account_id: PydanticObjectId | None = None
    to_account_id: PydanticObjectId | None = None


class Transaction(Document):

    transaction_type: Literal[
        "DEPOSIT",
        "WITHDRAW",
        "TRANSFER"
    ]

    from_account_id: PydanticObjectId | None = None
    to_account_id: PydanticObjectId | None = None

    amount: float

    created_at: Annotated[
        datetime,
        Indexed()
    ] = Field(
        default_factory=lambda:
            datetime.now(timezone.utc)
    )

    class Settings:
        name = "transactions"