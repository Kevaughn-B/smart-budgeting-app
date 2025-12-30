from fastapi import APIRouter

router = APIRouter(prefix="", tags=["System"])

@router.get("/health", tags=["Health"])
def health_check():
    return{"status": "ok"}