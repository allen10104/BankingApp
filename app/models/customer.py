from pydantic import BaseModel

class CustomerCreateAndUpdate(BaseModel):
    name: str
    username: str


class Customer(BaseModel):
    id: int
    name: str
    username: str
