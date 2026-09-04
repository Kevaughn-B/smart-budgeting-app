from datetime import date, datetime

from sqlalchemy import Boolean, Column, Date, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base import Base


class Bill(Base):
    __tablename__ = "bills"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    amount = Column(Float, nullable=False)
    due_date = Column(Date, nullable=False)
    reminder_days_before = Column(Integer, default=3, nullable=False)
    is_recurring = Column(Boolean, default=True, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    last_reminded_for = Column(Date)
    user_id = Column(ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="bills")
