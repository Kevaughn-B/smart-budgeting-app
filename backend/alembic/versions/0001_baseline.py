"""Create the baseline schema and safely upgrade the prior transaction table."""

from alembic import op
import sqlalchemy as sa

from app.db.base import Base
import app.models  # noqa: F401 - registers SQLAlchemy models

revision = "0001_baseline"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    tables = set(inspector.get_table_names())

    if "transactions" in tables:
        columns = {column["name"] for column in inspector.get_columns("transactions")}
        if "transaction_date" not in columns:
            op.add_column(
                "transactions",
                sa.Column("transaction_date", sa.Date(), nullable=True),
            )
            op.execute("UPDATE transactions SET transaction_date = CURRENT_DATE WHERE transaction_date IS NULL")
            op.alter_column("transactions", "transaction_date", nullable=False)

    Base.metadata.create_all(bind=bind)


def downgrade() -> None:
    # Existing projects may predate this migration, so automatic downgrade is unsafe.
    pass
