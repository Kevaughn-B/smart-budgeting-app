from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.db.base import Base

class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True)

    name = Column(String)

    needs_percent = Column(Float)
    wants_percent = Column(Float)
    savings_percent = Column(Float)
    investments_percent = Column(Float)

    monthly_limit = Column(Float, default=0)

    user_id = Column(ForeignKey("users.id"), unique=True)

    user = relationship("User", back_populates="budget")