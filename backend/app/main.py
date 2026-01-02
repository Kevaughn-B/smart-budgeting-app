from app.core.config import settings
import os
from app.api.users import router as users_router
from fastapi import FastAPI
from dotenv import load_dotenv
from app.api.health import router as health_router
#Temporary imports to create DB tables
from app.db.session import engine
from app.db.base import Base

load_dotenv()

app = FastAPI(
    title=settings.APP_NAME, 
    version=settings.APP_VERSION)

app.include_router(health_router)
app.include_router(users_router)

@app.get("/")
def root():
    return {"status": "Smart Budget API running successfully."}