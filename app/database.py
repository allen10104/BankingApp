import os

from beanie import init_beanie
from dotenv import load_dotenv
from pymongo import AsyncMongoClient

from app.models.account import Account
from app.models.branch import Branch
from app.models.customer import Customer
from app.models.transaction import Transaction


load_dotenv()


mongo_client = None


async def init_database():

    global mongo_client

    mongo_client = AsyncMongoClient(os.environ["MONGODB_URL"])

    await mongo_client.admin.command("ping")

    database = mongo_client[os.getenv("MONGODB_DB", "BankApp")]

    await init_beanie(
        database=database,
        document_models=[
            Customer,
            Account,
            Transaction,
            Branch
        ]
    )

    print("Connected to MongoDB")


async def close_database():

    if mongo_client is not None:
        await mongo_client.close()