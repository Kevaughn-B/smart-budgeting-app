from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordRequestForm

from app.api.deps import get_db

from app.models.user import User
from app.models.category import Category
from app.models.budget import Budget

from app.schemas.user import UserCreate

from app.core.config import settings


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"],
    deprecated="auto"
)


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


def create_token(user_id: int):

    payload = {
        "sub": str(user_id),
        "exp": datetime.utcnow() + timedelta(hours=24)
    }

    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )


@router.post("/register")
def register(
    data: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    user = User(
        email=data.email,
        hashed_password=hash_password(data.password)
    )

    db.add(user)
    db.flush()

    # Default categories
    default_categories = [
        "Salary",
        "Rent",
        "Groceries",
        "Utilities",
        "Entertainment"
    ]

    for name in default_categories:

        category = Category(
            name=name,
            user_id=user.id,
            is_default=True
        )

        db.add(category)

    # Default budget
    budget = Budget(
        user_id=user.id,
        needs_percent=50,
        wants_percent=30,
        savings_percent=20
    )

    db.add(budget)

    db.commit()
    db.refresh(user)

    return {
        "message": "User created successfully"
    }


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        form_data.password,
        user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_token(user.id)

    return {
        "access_token": token,
        "token_type": "bearer"
    }