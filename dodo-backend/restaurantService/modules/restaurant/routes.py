import logging

from aiokafka import AIOKafkaConsumer
from fastapi import WebSocket, WebSocketDisconnect, HTTPException, status
from faststream.kafka.fastapi import KafkaRouter
from core.config import load_kafka_config
from . import schemas

logger = logging.getLogger(__name__)
kafka_config = load_kafka_config()
router = KafkaRouter(f"{kafka_config.kafka_host}:{kafka_config.kafka_port}")


@router.websocket("/ws/orders/{region}")
async def receive_orders(
        region: str,
        ws: WebSocket,
):
    await ws.accept()
    logger.info("websocket accepted, start getting kafka consumer")
    kafka_consumer = AIOKafkaConsumer(
        f"orders_{region}",
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


@router.patch("/update_order_status/{order_id}")
async def update_order_status(
        order_id: int,
        order_body: schemas.OrderUpdate
):
    print("ac", order_body, order_id)
    await router.broker.publish(
        schemas.OrderUpdateStatus(
            order_id=order_id,
            status=order_body.status,
        ), f"orders_statuses_{order_body.region}"
    )
    raise HTTPException(status_code=status.HTTP_200_OK)
