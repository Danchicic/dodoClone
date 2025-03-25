from fastapi import APIRouter, HTTPException, status
from . import schemas

router = APIRouter()


@router.post("/create_order")
async def create_order(user_order: schemas.UserOrder):
    raise HTTPException(
        status_code=status.HTTP_201_CREATED,
        detail="Order was created successfully"
    )


@router.get("/test")
async def create_order():
    return {"status": "OK"}
