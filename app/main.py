from fastapi import FastAPI

from app.controllers.customer_controller import router as customer_router
from app.controllers.transaction_controller import router as transaction_router
from app.controllers.account_controller import router as account_router

app = FastAPI(
    title="Rest Banking API"
)


app.include_router(customer_router)
app.include_router(transaction_router)
app.include_router(account_router)