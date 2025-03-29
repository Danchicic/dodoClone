import logging

from aiokafka import AIOKafkaConsumer
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from core.config import load_kafka_config

logger = logging.getLogger(__name__)
router = APIRouter()
kafka_config = load_kafka_config()


@router.websocket("/orders/{region}")
async def receive_orders(
        region: str,
        ws: WebSocket,
):
    await ws.accept()
    logger.info("websocket accepted, start getting kafka consumer")
    kafka_consumer = AIOKafkaConsumer(
        region,
        bootstrap_servers=f"{kafka_config.kafka_host}:{kafka_config.kafka_port}",
        auto_offset_reset='earliest',
    )
    logger.info(f"Connceted to topic: {region}")
    await kafka_consumer.start()

    async def receive_message():
        async for message in kafka_consumer:
            return message.value.decode('utf-8')

    try:
        while True:
            decoded_message = await receive_message()
            logger.info(decoded_message)
            await ws.send_text(decoded_message)

    except WebSocketDisconnect:
        logger.info("websocket disconnected")
    except Exception:
        logger.exception("unhandled exception")
    finally:
        await kafka_consumer.stop()
        logger.info("kafka loop finished")
