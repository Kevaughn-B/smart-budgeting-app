from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.base import Base
from datetime import datetime
from sqlalchemy import DateTime

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    user_id = Column(ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)