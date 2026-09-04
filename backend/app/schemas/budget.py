from pydantic import BaseModel, ConfigDict, Field

class BudgetUpdate(BaseModel):
    monthly_limit: float = Field(ge=0, le=10_000_000)

class BudgetResponse(BaseModel):
    id: int
    monthly_limit: float

    model_config = ConfigDict(from_attributes=True)
