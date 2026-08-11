from typing import Annotated, Literal

import pymongo
from beanie import Document, Indexed, PydanticObjectId
from pydantic import BaseModel


class AccountCreate(BaseModel):
    customer_id: PydanticObjectId
    account_type: Literal["CHECKING", "SAVINGS"]
    branch_id: int


class Account(Document):
    customer_id: PydanticObjectId
    account_number: Annotated[str, Indexed(unique=True)]
    account_type: Literal["CHECKING", "SAVINGS"]
    branch_id: int
    balance: float = 0.0

    class Settings:
        name = "accounts"

        indexes = [
            [
                ("branch_id", pymongo.ASCENDING),
                ("balance", pymongo.ASCENDING)
            ]
        ]