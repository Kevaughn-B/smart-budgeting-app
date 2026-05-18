from pydantic import BaseModel

class BudgetUpdate(BaseModel):
    monthly_limit: float

class BudgetResponse(BaseModel):
    id: int
    monthly_limit: float

    class Config:
        from_attributes = True