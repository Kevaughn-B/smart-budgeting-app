from calendar import monthrange
from datetime import date, timedelta
import json
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.core.config import settings
from app.models.bill import Bill
from app.models.user import User
from app.schemas.bill import BillCreate, BillRead

router = APIRouter(prefix="/bills", tags=["Bills"])


@router.post("/", response_model=BillRead, status_code=status.HTTP_201_CREATED)
def create_bill(
    data: BillCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    bill = Bill(user_id=user.id, **data.model_dump())
    db.add(bill)
    db.commit()
    db.refresh(bill)
    return bill


@router.get("/", response_model=list[BillRead])
def get_bills(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return db.query(Bill).filter(Bill.user_id == user.id).order_by(Bill.due_date).all()


@router.delete("/{bill_id}")
def delete_bill(
    bill_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    bill = db.query(Bill).filter(Bill.id == bill_id, Bill.user_id == user.id).first()
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")
    db.delete(bill)
    db.commit()
    return {"message": "Bill deleted successfully"}


def send_reminder(to_email: str, bill: Bill) -> None:
    if not settings.RESEND_API_KEY or not settings.RESEND_FROM_EMAIL:
        raise RuntimeError("Resend is not configured")
    payload = json.dumps({
        "from": settings.RESEND_FROM_EMAIL,
        "to": [to_email],
        "subject": f"Reminder: {bill.name} is due {bill.due_date.isoformat()}",
        "html": f"<p>Your bill <strong>{bill.name}</strong> for ${bill.amount:.2f} is due on {bill.due_date:%B %d, %Y}.</p>",
    }).encode()
    request = Request(
        "https://api.resend.com/emails",
        data=payload,
        headers={"Authorization": f"Bearer {settings.RESEND_API_KEY}", "Content-Type": "application/json"},
        method="POST",
    )
    with urlopen(request, timeout=10) as response:
        if response.status not in (200, 201):
            raise RuntimeError("Resend rejected the reminder")


def next_month(value: date) -> date:
    year = value.year + (value.month == 12)
    month = 1 if value.month == 12 else value.month + 1
    return date(year, month, min(value.day, monthrange(year, month)[1]))


@router.post("/process-reminders")
def process_reminders(
    x_reminder_token: str | None = Header(default=None),
    db: Session = Depends(get_db),
):
    if not settings.REMINDER_JOB_TOKEN or x_reminder_token != settings.REMINDER_JOB_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid reminder token")
    if not settings.RESEND_API_KEY or not settings.RESEND_FROM_EMAIL:
        raise HTTPException(status_code=503, detail="Email reminders are not configured")

    today = date.today()
    sent = 0
    bills = db.query(Bill).filter(Bill.is_active.is_(True)).all()
    for bill in bills:
        reminder_date = bill.due_date - timedelta(days=bill.reminder_days_before)
        if reminder_date > today or bill.last_reminded_for == bill.due_date:
            continue
        try:
            send_reminder(bill.user.email, bill)
        except (HTTPError, URLError, RuntimeError):
            continue
        bill.last_reminded_for = bill.due_date
        if bill.is_recurring:
            bill.due_date = next_month(bill.due_date)
        else:
            bill.is_active = False
        sent += 1
    db.commit()
    return {"sent": sent}
