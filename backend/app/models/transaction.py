from sqlalchemy import Column, Integer, Float, String, ForeignKey
from app.db.base import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True)
    amount = Column(Float)
    type = Column(String)  # income | expense
    category_id = Column(ForeignKey("categories.id"))
    user_id = Column(ForeignKey("users.id"))