from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.controllers.account_controller import router as account_router
from app.controllers.customer_controller import router as customer_router
from app.controllers.transaction_controller import router as transaction_router
from app.database import close_database, init_database


@asynccontextmanager
async def lifespan(app: FastAPI):

    await init_database()

    yield

    await close_database()


app = FastAPI(
    title="Banking API",
    lifespan=lifespan
)

app.include_router(customer_router)
app.include_router(account_router)
app.include_router(transaction_router)