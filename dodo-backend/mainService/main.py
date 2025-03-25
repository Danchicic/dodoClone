from contextlib import asynccontextmanager

from fastapi import FastAPI
import uvicorn
import logging
from starlette.middleware.cors import CORSMiddleware

from modules.mainPage.routes import router
from redis_utils import init_redis, close_redis


@asynccontextmanager
async def lifespan(app: FastAPI):
    logging.basicConfig(
        level=logging.DEBUG,
        format="%(asctime)s - %(levelname)s - %(name)s - %(message)s",
    )
    init_redis()
    yield
    close_redis()


app = FastAPI(
    lifespan=lifespan,
    swagger_ui_parameters={
        "displayRequestDuration": True,  # Показать длительность запросов
    },
    root_path="/api/main",
)

app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_origins=["http://localhost:5173", "http://localhost:5174"]
)

if __name__ == '__main__':
    uvicorn.run("main:app", reload=True, host="localhost", port=8000)
