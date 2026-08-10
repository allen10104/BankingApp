from fastapi import APIRouter, HTTPException

from app.models.customer import Customer
from app.repositories.customer_repository import CustomerRepository
from app.services.customer_service import CustomerService


router = APIRouter(
    prefix="/api/v1/customers",
    tags=["Customers"]
)

customer_repository = CustomerRepository()
customer_service = CustomerService(customer_repository)


@router.get("", response_model=list[Customer])
def get_customers():

    return customer_service.get_all_customers()


@router.get("/{customer_id}", response_model=Customer)
def get_customer(customer_id: int):

    customer = customer_service.get_customer_by_id(customer_id)

    if customer is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return customer