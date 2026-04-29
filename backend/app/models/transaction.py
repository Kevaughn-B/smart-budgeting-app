from sqlalchemy import Column, Integer, Float, String, ForeignKey
from app.db.base import Base
from datetime import datetime
from sqlalchemy import DateTime, Enum
from sqlalchemy.orm import relationship


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True)
    amount = Column(Float, nullable=False)
    type = Column(Enum("income", "expense", name="transaction_type"))
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    user_id = Column(ForeignKey("users.id"))
    category_id = Column(ForeignKey("categories.id"))

    user = relationship("User", back_populates="transactions")
    category = relationship("Category", back_populates="transactions")