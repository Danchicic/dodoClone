from fastapi import FastAPI
import uvicorn
from starlette.middleware.cors import CORSMiddleware

from modules.mainPage.routes import router

app = FastAPI()

app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_origins=["http://localhost:5173", "http://localhost:5174"]
)

if __name__ == '__main__':
    uvicorn.run("main:app", reload=True, host="localhost", port=8000)
