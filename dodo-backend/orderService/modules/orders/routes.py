import logging

import aiokafka
from fastapi import APIRouter, HTTPException, status, Depends

from kafka_broker.producer import KafkaProducer, get_producer
from . import schemas

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/create_order")
async def create_order(
        region: str,
        user_order: schemas.UserOrder,
        kafka: KafkaProducer = Depends(get_producer)
):

    try:
        await kafka.send_message(region, user_order.model_dump())
        raise HTTPException(
            status_code=status.HTTP_201_CREATED,
            detail="Order was created successfully"
        )
    except aiokafka.errors.KafkaTimeoutError:
        logger.exception("Failed to create order in kafka")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create order"
        )


@router.get("/test")
async def create_order():
    return {"status": "OK"}
