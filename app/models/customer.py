from typing import Annotated

from beanie import Document, Indexed, PydanticObjectId
from pydantic import BaseModel, ConfigDict


class CustomerCreate(BaseModel):
    name: str
    username: str
    password: str


class CustomerUpdate(BaseModel):
    name: str
    username: str


class CustomerResponse(BaseModel):
    id: PydanticObjectId
    name: str
    username: str

    model_config = ConfigDict(
        from_attributes=True
    )


class Customer(Document):
    name: str
    username: Annotated[str, Indexed(unique=True)]
    password_hash: str

    class Settings:
        name = "users"