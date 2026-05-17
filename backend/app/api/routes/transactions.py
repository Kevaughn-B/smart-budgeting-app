from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user

from app.models.transaction import Transaction
from app.models.category import Category
from app.models.budget import Budget
from app.models.user import User

from app.schemas.transaction import (
    TransactionCreate,
    TransactionRead
)

router = APIRouter(
    prefix="/transactions",
    tags=["Transactions"]
)


@router.post("/", response_model=TransactionRead)
def create_transaction(
    data: TransactionCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):

    category = db.query(Category).filter(
        Category.id == data.category_id,
        Category.user_id == user.id
    ).first()

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    if data.type not in ["income", "expense"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid transaction type"
        )

    transaction = Transaction(
        amount=data.amount,
        type=data.type,
        category_id=data.category_id,
        user_id=user.id,
        description=data.description
    )

    db.add(transaction)
    db.commit()
    db.refresh(transaction)

    return transaction


@router.get("/", response_model=list[TransactionRead])
def get_transactions(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):

    transactions = db.query(Transaction).filter(
        Transaction.user_id == user.id
    ).all()

    return transactions


@router.get("/summary")
def get_summary(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):

    income = db.query(func.sum(Transaction.amount)).filter(
        Transaction.user_id == user.id,
        Transaction.type == "income"
    ).scalar() or 0

    expenses = db.query(func.sum(Transaction.amount)).filter(
        Transaction.user_id == user.id,
        Transaction.type == "expense"
    ).scalar() or 0

    balance = income - expenses

    return {
        "income": income,
        "expenses": expenses,
        "balance": balance
    }


@router.get("/analysis")
def get_budget_analysis(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):

    transactions = db.query(Transaction).filter(
        Transaction.user_id == user.id
    ).all()

    budget = db.query(Budget).filter(
        Budget.user_id == user.id
    ).first()

    if not budget:
        raise HTTPException(
            status_code=404,
            detail="No budget found"
        )

    income = sum(
        t.amount for t in transactions
        if t.type == "income"
    )

    expenses = sum(
        t.amount for t in transactions
        if t.type == "expense"
    )

    balance = income - expenses

    if income == 0:
        expense_percent = 0
    else:
        expense_percent = (expenses / income) * 100

    status = (
        "over budget"
        if expense_percent > budget.needs_percent
        else "within budget"
    )

    return {
        "income": income,
        "expenses": expenses,
        "balance": balance,
        "expense_percent": round(expense_percent, 2),
        "budget_limit": budget.needs_percent,
        "status": status
    }