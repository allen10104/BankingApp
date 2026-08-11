from datetime import datetime

from pydantic import BaseModel


class TransferCreate(BaseModel):
    from_account_id: int
    to_account_id: int
    amount: float


class Transaction(BaseModel):
    id: int
    transaction_type: str
    from_account_id: int
    to_account_id: int
    amount: float
    created_at: datetime