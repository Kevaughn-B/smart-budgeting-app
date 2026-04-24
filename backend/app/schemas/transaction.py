from pydantic import BaseModel

class TransactionCreate(BaseModel):
    amount: float
    type: str
    category_id: int

class TransactionRead(BaseModel):
    id: int
    amount: float
    type: str
    category_id: int

    class Config:
        from_attributes = True