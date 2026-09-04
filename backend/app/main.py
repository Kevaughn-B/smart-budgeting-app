from fastapi import FastAPI
from app.api.routes import auth, bills, budgets, categories, dashboard, transactions
from app.api import health
from app.models import *
from app.core.config import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Smart Budget API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.CORS_ORIGINS.split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(auth.router)
app.include_router(categories.router)
app.include_router(transactions.router)
app.include_router(budgets.router)
app.include_router(dashboard.router)
app.include_router(bills.router)

@app.get("/")
def root():
    return {"message": "Smart Budgeting API is running"}
