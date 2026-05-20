from pydantic import BaseModel

class TransactionCreate(BaseModel):
    amount: float
    type: str
    category_id: int
    description: str

class TransactionRead(BaseModel):
    id: int
    amount: float
    type: str
    category_id: int
    description: str

    class Config:
        from_attributes = True