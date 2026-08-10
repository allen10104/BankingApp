from fastapi import FastAPI

from app.controllers.customer_controller import router as customer_router


app = FastAPI(
    title="Rest Banking API"
)


app.include_router(customer_router)