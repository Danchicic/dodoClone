import json
import logging
from typing import Optional

from aiokafka import AIOKafkaProducer

from core.config import load_kafka_config

logger = logging.getLogger(__name__)
kafka_config = load_kafka_config()


class KafkaProducer:
    producer = None

    def __new__(cls, bootstrap_servers: str):
        if not hasattr(cls, "instance"):
            cls.instance = super(KafkaProducer, cls).__new__(cls)
            cls.instance.bootstrap_servers = bootstrap_servers
            cls.instance.producer = None

        return cls.instance

    async def start(self):
        self.producer = AIOKafkaProducer(
            bootstrap_servers=self.bootstrap_servers,
            value_serializer=lambda v: json.dumps(v).encode("utf-8"),
        )
        await self.producer.start()

    async def stop(self):
        if self.producer:
            await self.producer.stop()

    async def send_message(self, topic: str, message: dict, key: Optional[str] = None):
        try:
            await self.producer.send_and_wait(topic, value=message, key=key.encode("utf-8") if key else None)
        except Exception:
            logger.exception("Error while message send")
            raise


def get_producer():
    yield KafkaProducer(
        bootstrap_servers=f"{kafka_config.kafka_host}:{kafka_config.kafka_port}",
    )
