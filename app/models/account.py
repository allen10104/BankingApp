from typing import Literal

from pydantic import BaseModel


class AccountCreate(BaseModel):
    customer_id: int
    account_type: Literal["CHECKING", "SAVINGS"]
    branch_id: int


class Account(BaseModel):
    id: int
    customer_id: int
    account_type: str
    branch_id: int
    balance: float