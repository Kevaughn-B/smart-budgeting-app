import os
from fastapi import FastAPI
from dotenv import load_dotenv
from app.api.health import router as health_router

load_dotenv()

app = FastAPI(
    title=os.getenv("APP_NAME"),
    version=os.getenv("APP_VERSION")
)

app.include_router(health_router)

@app.get("/")
def root():
    return {"status": "Smart Budget API running successfully."}