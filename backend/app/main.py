from fastapi import FastAPI
from app.api.routes import auth, categories, transactions
from app.db.base import Base
from app.db.session import engine
from app.models import *
from app.api.routes import budgets, dashboard
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Smart Budget API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(categories.router)
app.include_router(transactions.router)
app.include_router(budgets.router)
app.include_router(dashboard.router)

@app.get("/")
def root():
    return {"message": "Smart Budgeting API is running"}