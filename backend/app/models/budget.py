from sqlalchemy.orm import relationship

class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True)

    name = Column(String)
    needs_percent = Column(Float)
    wants_percent = Column(Float)
    savings_percent = Column(Float)
    investments_percent = Column(Float)

    user_id = Column(ForeignKey("users.id"))

    user = relationship("User", back_populates="budgets")