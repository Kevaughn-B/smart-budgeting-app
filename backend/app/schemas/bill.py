from datetime import date

from pydantic import BaseModel, ConfigDict, Field


class BillCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    amount: float = Field(gt=0, le=10_000_000)
    due_date: date
    reminder_days_before: int = Field(default=3, ge=0, le=30)
    is_recurring: bool = True


class BillRead(BillCreate):
    id: int
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
