from typing import Annotated

from beanie import Document, Indexed


class Branch(Document):
    branch_id: Annotated[int, Indexed(unique=True)]
    branch_code: Annotated[str, Indexed(unique=True)]
    name: str

    class Settings:
        name = "branches"