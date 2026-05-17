from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.models.budget import Budget
from app.models.user import User
from app.schemas.budget import BudgetUpdate

router = APIRouter(prefix="/budget", tags=["Budget"])


@router.get("/")
def get_budget(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    budget = db.query(Budget).filter(
        Budget.user_id == current_user.id
    ).first()

    return budget


@router.put("/")
def update_budget(
    data: BudgetUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    budget = db.query(Budget).filter(
        Budget.user_id == current_user.id
    ).first()

    if not budget:
        raise HTTPException(status_code=404, detail="Budget not found")

    budget.monthly_limit = data.monthly_limit

    db.commit()
    db.refresh(budget)

    return budget