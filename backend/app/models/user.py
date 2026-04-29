from sqlalchemy import Column, Integer, String
from app.db.base import Base
from datetime import datetime
from sqlalchemy import DateTime
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    budgets = relationship("Budget", back_populates="user")
    transactions = relationship("Transaction", back_populates="user")
    categories = relationship("Category", back_populates="user")