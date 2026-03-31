from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    username: str
    password: str

class UserRead(UserBase):
    id: int
    username: str
    created_at: datetime
    updated_at: datetime

class Config:
    from_attributes = True