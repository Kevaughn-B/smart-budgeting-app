from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.base import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    user_id = Column(ForeignKey("users.id"))