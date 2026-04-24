from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.transaction import TransactionRead
from app.api.deps import get_db, get_current_user
from app.models.transaction import Transaction
from app.models.category import Category
from app.schemas.transaction import TransactionCreate
from app.models.user import User

router = APIRouter(prefix="/transactions", tags=["Transactions"])


@router.post("/")
def create_transaction(
    data: TransactionCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    # ✅ Validate category belongs to user
    category = db.query(Category).filter(
        Category.id == data.category_id,
        Category.user_id == user.id
    ).first()

    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    # ✅ Validate type
    if data.type not in ["income", "expense"]:
        raise HTTPException(status_code=400, detail="Invalid type")

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


@router.get("/", response_model=list[TransactionRead])
def get_transactions(
    db: Session = Depends(get_db), 
    user=Depends(get_current_user)
):
    return db.query(Transaction).filter(Transaction.user_id == user.id).all()


@router.get("/summary")
def get_summary(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    transactions = db.query(Transaction).filter(
        Transaction.user_id == user.id
    ).all()

    income = sum(t.amount for t in transactions if t.type == "income")
    expense = sum(t.amount for t in transactions if t.type == "expense")

    return {
        "income": income,
        "expense": expense,
        "balance": income - expense
    }