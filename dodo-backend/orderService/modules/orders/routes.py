import json
import logging
import random

import aiokafka
from aiokafka import AIOKafkaConsumer
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi_sse import sse_handler

from core.config import load_kafka_config
from kafka_broker.producer import KafkaProducer, get_producer
from . import schemas
from .schemas import UpdatedStatus
from .utils import generate_random_name, generate_random_phone_number
from ..repositories.sqlalchemy_repositories import OrderRepository

kafka_config = load_kafka_config()
router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/create_order")
async def create_order(
        region: str,
        user_order: schemas.UserOrder,
        kafka: KafkaProducer = Depends(get_producer),
):
    try:
        # save order in db and add id to order
        # also add user name
        # do not send cost, picture,
        # user takes from jwt token in headers(bearer <token>)
        order_info = {
            'user_id': random.randint(1, 10_000),
            'order_status': 1,
            'order_items': user_order.model_dump()['pizzas']
        }

        # add order to db using repository
        user_order_id = await OrderRepository().add_one(order_info)
        if not user_order_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="cant create order",
            )

        user_full_info_order = schemas.UserOrderCreateSchema(
            id=user_order_id,
            pizzas=[schemas.PizzaShortInfo(**el.model_dump()) for el in user_order.pizzas],
            username=generate_random_name(),  # user.username
            user_phone_number=generate_random_phone_number()  # user.phone_number
        )
        await kafka.send_message(f"orders_{region}", user_full_info_order.model_dump())
        raise HTTPException(
            status_code=status.HTTP_201_CREATED, detail="Order was created successfully"
        )
    except aiokafka.errors.KafkaTimeoutError:
        logger.exception("Failed to create order in kafka")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create order",
        )


@router.get("/orders/{order_id}")
@sse_handler()
async def order_status_streaming(order_id: str):
    return
    # check that order in processing, not done
    yield schemas.UpdatedStatus(new_status="Processing")

    order_update_consumer = AIOKafkaConsumer(
        "orders_status_topic",
        bootstrap_servers=f"{kafka_config.kafka_host}:{kafka_config.kafka_port}",
    )
    await order_update_consumer.start()
    async for msg_object in order_update_consumer:
        message: dict = json.loads(msg_object.value.decode("utf-8"))
        # check current user
        if message["order_id"] == order_id:
            yield UpdatedStatus(new_status="Completed")


@router.get("/test")
async def health_check():
    return {"status": "OK"}
