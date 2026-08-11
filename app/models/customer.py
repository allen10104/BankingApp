from typing import Annotated
from beanie import Document, Indexed
from pydantic import BaseModel


class CustomerCreateAndUpdate(BaseModel):
    name: str
    username: str


class Customer(Document):
    name: str
    username: Annotated[str, Indexed(unique=True)]

    class Settings:
        name = "users"