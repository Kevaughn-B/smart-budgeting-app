from fastapi import FastAPI
from app.api.routes import auth
from app.db.base import Base
from app.db.session import engine

app = FastAPI(title="Smart Budget API")

# Create tables (SQLite file will be generated automatically)
Base.metadata.create_all(bind=engine)

app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "API running with SQLite"}