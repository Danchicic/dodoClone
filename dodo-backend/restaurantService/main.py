import logging
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from modules.restaurant.routes import router


@asynccontextmanager
async def lifespan(app: FastAPI):
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(name)s - %(message)s:%(lineno)d",
    )

    yield


app = FastAPI(
    lifespan=lifespan,
    swagger_ui_parameters={
        "displayRequestDuration": True,  # Показать длительность запросов
    },
    root_path="/api/restaurants",
)

app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_origins=["http://localhost:5173", "http://localhost:5174"]
)

if __name__ == '__main__':
    uvicorn.run("main:app", reload=True, host="localhost", port=8002)
