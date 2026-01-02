from sqlalchemy import Column, Integer, String, DATETIME, func
from app.db.base import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DATETIME, server_default=func.now(), nullable=False)
    updated_at = Column(DATETIME, server_default=func.now(), onupdate=func.now(), nullable=False)