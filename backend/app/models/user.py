from sqlalchemy import Column, Integer, String
from app.db.base import Base
from datetime import datetime
from sqlalchemy import DateTime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    hashed_password = Column(String)