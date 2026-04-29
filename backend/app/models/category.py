from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from app.db.base import Base
from datetime import datetime
from sqlalchemy import DateTime
from sqlalchemy.orm import relationship

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    is_default = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user_id = Column(ForeignKey("users.id"), nullable=True)  

    user = relationship("User", back_populates="categories")
    transactions = relationship("Transaction", back_populates="category")