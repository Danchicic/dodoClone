from contextlib import asynccontextmanager

from fastapi import FastAPI
import uvicorn
import logging
from starlette.middleware.cors import CORSMiddleware

from core.config import load_kafka_config
from database import init_models
from modules.orders.routes import router
from kafka_broker.producer import KafkaProducer

kafka_config = load_kafka_config()


@asynccontextmanager
async def lifespan(app: FastAPI):
    logging.basicConfig(
        level=logging.DEBUG,
        format="%(asctime)s - %(levelname)s - %(name)s - %(message)s",
    )
    await init_models()
    kafka_producer = KafkaProducer(f"{kafka_config.kafka_host}:{kafka_config.kafka_port}")
    await kafka_producer.start()
    yield
    await kafka_producer.stop()


app = FastAPI(
    lifespan=lifespan,
    swagger_ui_parameters={
        "displayRequestDuration": True,  # Показать длительность запросов
    },
    root_path="/api/orders",
)

app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_origins=["http://localhost:5173", "http://localhost:5174"]
)

if __name__ == '__main__':
    uvicorn.run("main:app", reload=True, host="localhost", port=8001)
