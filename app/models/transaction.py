from datetime import datetime, timezone
from typing import Annotated, Literal

from beanie import Document, Indexed, PydanticObjectId
from pydantic import BaseModel, Field


class TransferCreate(BaseModel):
    from_account_id: PydanticObjectId
    to_account_id: PydanticObjectId
    amount: float


class Transaction(Document):
    transaction_type: Literal["TRANSFER"] = "TRANSFER"

    from_account_id: PydanticObjectId
    to_account_id: PydanticObjectId

    amount: float

    created_at: Annotated[
        datetime,
        Indexed()
    ] = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    class Settings:
        name = "transactions"