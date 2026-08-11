from fastapi import APIRouter, HTTPException
from starlette import status

from app.models.customer import Customer, CustomerCreateAndUpdate
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

@router.post("", response_model = Customer, status_code=201)
def create_customer(customer_data: CustomerCreateAndUpdate):
    return customer_service.create_customer(customer_data)


@router.put("/{customer_id}", response_model=Customer, status_code=200)
def update_customer(customer_id: int, customer_data: CustomerCreateAndUpdate):
    customer = customer_service.update_customer(customer_id, customer_data)
    if customer is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )
    return customer

@router.delete("/{customer_id}", status_code=200)
def delete_customer(customer_id: int):
    customer = customer_service.delete_customer(customer_id)

    if customer is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return customer