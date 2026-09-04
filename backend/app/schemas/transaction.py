from datetime import date
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

class TransactionCreate(BaseModel):
    amount: float = Field(gt=0, le=10_000_000)
    type: Literal["income", "expense"]
    category_id: int
    description: str = Field(min_length=1, max_length=255)
    transaction_date: date = Field(default_factory=date.today)

class TransactionRead(BaseModel):
    id: int
    amount: float
    type: str
    category_id: int
    description: str
    transaction_date: date

    model_config = ConfigDict(from_attributes=True)
