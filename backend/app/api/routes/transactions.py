from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.models.transaction import Transaction
from app.schemas.transaction import TransactionCreate
from app.models.user import User

router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.post("/")
def create_transaction(
    data: TransactionCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    transaction = Transaction(
        amount=data.amount,
        type=data.type,
        category_id=data.category_id,
        user_id=user.id
    )
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction

@router.get("/")
def get_transactions(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    return db.query(Transaction).filter(Transaction.user_id == user.id).all()