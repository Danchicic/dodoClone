from fastapi import FastAPI
import uvicorn
from modules.mainPage.routes import router

app = FastAPI()

app.include_router(router)

if __name__ == '__main__':
    uvicorn.run("main:app", reload=True, host="localhost", port=8000)
