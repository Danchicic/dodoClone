import logging

from fastapi import APIRouter, WebSocket
from aiokafka import AIOKafkaConsumer

from restaurantService.core.config import load_kafka_config

logger = logging.getLogger(__name__)
router = APIRouter()
kafka_config = load_kafka_config()


@router.websocket("ws://orders")
async def receive_orders(
        ws: WebSocket
):
    consumer = AIOKafkaConsumer(
        "orders",
        bootstrap_servers=f"{kafka_config.kafka_host}:{kafka_config.kafka_port}",
        group_id="order_group",
        auto_offset_reset="earliest"
    )
    logger.info("start kafka consumer")
    await ws.accept()
    logger.info("websocket accepted")
    await consumer.start()
    logger.info("consumer started")
    while True:
        async for msg in consumer:
            decoded_message = msg.value.decode('utf-8')
            await ws.send_text(decoded_message)
