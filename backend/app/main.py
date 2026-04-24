from fastapi import FastAPI
from app.api.routes import auth, categories, transactions
from app.db.base import Base
from app.db.session import engine

app = FastAPI(title="Smart Budget API")

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(categories.router)
app.include_router(transactions.router)

@app.get("/")
def root():
    return {"message": "Smart Budgeting API is running"}