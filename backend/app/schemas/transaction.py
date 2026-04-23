from pydantic import BaseModel

class TransactionCreate(BaseModel):
    amount: float
    type: str
    category_id: int