from fastapi import FastAPI
from dotenv import load_dotenv

from app.core.config import settings
from app.api.health import router as health_router
from app.api.users import router as users_router
from app.api.auth import router as auth_router

# Temporary DB setup
from app.db.session import engine
from app.db.base import Base

load_dotenv()

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)

app.include_router(health_router)
app.include_router(users_router)
app.include_router(auth_router)


@app.get("/")
def root():
    return {"status": "Smart Budget API running successfully."}