from sqlalchemy import Column, Integer, Float, String, ForeignKey
from app.db.base import Base
from datetime import datetime
from sqlalchemy import DateTime

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True)
    amount = Column(Float)
    type = Column(String)  # income | expense
    category_id = Column(ForeignKey("categories.id"))
    user_id = Column(ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)