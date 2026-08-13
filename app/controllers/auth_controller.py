from fastapi import APIRouter, Depends, HTTPException
from starlette import status

from app.dependencies import (auth_service, get_current_customer)

from app.models.auth import (LoginRequest, TokenResponse)

from app.models.customer import (Customer, CustomerResponse)


router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication"]
)


@router.post("/login", response_model=TokenResponse)
async def login(login_data: LoginRequest):

    token = await auth_service.login(login_data)

    if token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={
                "WWW-Authenticate": "Bearer"
            }
        )

    return TokenResponse(access_token=token, token_type="bearer")


@router.get("/me", response_model=CustomerResponse)
async def get_me(current_customer: Customer = Depends(get_current_customer)):
    return current_customer