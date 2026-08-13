from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException
from starlette import status

from app.dependencies import customer_service
from app.models.customer import (CustomerCreate, CustomerUpdate, CustomerResponse)


router = APIRouter(
    prefix="/api/v1/customers",
    tags=["Customers"]
)


@router.get("", response_model=list[CustomerResponse])
async def get_customers():
    return await customer_service.get_all_customers()


@router.get("/{customer_id}", response_model=CustomerResponse)
async def get_customer(customer_id: PydanticObjectId):
    customer = await customer_service.get_customer_by_id(customer_id)

    if customer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )

    return customer


@router.post("", response_model=CustomerResponse, status_code=status.HTTP_201_CREATED)
async def create_customer(
    customer_data: CustomerCreate
):

    customer = await customer_service.create_customer(customer_data)

    if isinstance(customer, str):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=customer
        )

    return customer


@router.put("/{customer_id}", response_model=CustomerResponse)
async def update_customer(customer_id: PydanticObjectId, customer_data: CustomerUpdate):

    customer = await customer_service.update_customer(customer_id, customer_data)

    if customer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )

    return customer


@router.delete("/{customer_id}", response_model=CustomerResponse)
async def delete_customer(customer_id: PydanticObjectId):
    customer = await customer_service.delete_customer(customer_id)

    if customer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )

    return customer