from fastapi import APIRouter, HTTPException, status, Depends

from kafka_broker.producer import KafkaProducer, get_producer
from . import schemas

router = APIRouter()


@router.post("/create_order")
async def create_order(
        user_order: schemas.UserOrder,
        kafka: KafkaProducer = Depends(get_producer)
):
    try:
        await kafka.send_message("orders", user_order.model_dump())
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_201_CREATED,
            detail="Order was created successfully"
        )


@router.get("/test")
async def create_order():
    return {"status": "OK"}
