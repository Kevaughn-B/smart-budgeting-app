from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.category import CategoryRead
from app.api.deps import get_db, get_current_user
from app.models.category import Category
from app.schemas.category import CategoryCreate
from app.models.user import User

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.post("/")
def create_category(
    data: CategoryCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    category = Category(name=data.name, user_id=user.id)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category

@router.get("/", response_model=list[CategoryRead])
def get_categories(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return db.query(Category).filter(Category.user_id == user.id).all()