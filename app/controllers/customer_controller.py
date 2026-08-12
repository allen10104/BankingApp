from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException
from starlette import status

from app.dependencies import customer_service
from app.models.customer import (Customer, CustomerCreateAndUpdate)


router = APIRouter(prefix="/api/v1/customers", tags=["Customers"])


@router.get("", response_model=list[Customer], response_model_by_alias=False)
async def get_customers():
    return await customer_service.get_all_customers()


@router.get("/{customer_id}", response_model=Customer,  response_model_by_alias=False)
async def get_customer(customer_id: PydanticObjectId):
    customer = await customer_service.get_customer_by_id(customer_id)

    if customer is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found")

    return customer


@router.post("", response_model=Customer, status_code=status.HTTP_201_CREATED)
async def create_customer(customer_data: CustomerCreateAndUpdate):
    return await customer_service.create_customer(customer_data)


@router.put("/{customer_id}", response_model=Customer)
async def update_customer(customer_id: PydanticObjectId, customer_data: CustomerCreateAndUpdate):

    customer = await customer_service.update_customer(
        customer_id,
        customer_data
    )

    if customer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )

    return customer


@router.delete("/{customer_id}",response_model=Customer)
async def delete_customer(customer_id: PydanticObjectId):

    customer = await customer_service.delete_customer(customer_id)

    if customer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )

    return customer