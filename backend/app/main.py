from fastapi import FastAPI
from app.api.health import router as health_router

app = FastAPI(
    title="Smart Budget API",
    version="1.0.0"
)

app.include_router(health_router)

@app.get("/")
def root():
    return {"status": "Smart Budget API running successfully."}