import os

os.environ["DATABASE_URL"] = "sqlite:///./test_smart_budget.db"
os.environ["SECRET_KEY"] = "test-secret-key"

from fastapi.testclient import TestClient

from app.api.deps import get_db
from app.db.base import Base
from app.db.session import SessionLocal, engine
from app.main import app


def override_get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


def setup_function():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def register_and_login(email: str) -> str:
    registration = client.post(
        "/auth/register",
        json={"email": email, "password": "secure-password"},
    )
    assert registration.status_code == 200
    login = client.post(
        "/auth/login",
        data={"username": email, "password": "secure-password"},
    )
    assert login.status_code == 200
    return login.json()["access_token"]


def test_transaction_is_private_to_its_owner():
    first_token = register_and_login("first@example.com")
    headers = {"Authorization": f"Bearer {first_token}"}
    categories = client.get("/categories/", headers=headers).json()
    transaction = client.post(
        "/transactions/",
        headers=headers,
        json={
            "amount": 25.50,
            "type": "expense",
            "category_id": categories[0]["id"],
            "description": "Groceries",
            "transaction_date": "2026-08-30",
        },
    )
    assert transaction.status_code == 200
    transaction_id = transaction.json()["id"]

    updated = client.put(
        f"/transactions/{transaction_id}",
        headers=headers,
        json={
            "amount": 30,
            "type": "expense",
            "category_id": categories[0]["id"],
            "description": "Updated groceries",
            "transaction_date": "2026-08-31",
        },
    )
    assert updated.status_code == 200
    assert updated.json()["description"] == "Updated groceries"

    second_token = register_and_login("second@example.com")
    response = client.get(
        f"/transactions/{transaction_id}",
        headers={"Authorization": f"Bearer {second_token}"},
    )
    assert response.status_code == 404

    deleted = client.delete(f"/transactions/{transaction_id}", headers=headers)
    assert deleted.status_code == 200


def test_bill_can_be_created_for_authenticated_user():
    token = register_and_login("bills@example.com")
    response = client.post(
        "/bills/",
        headers={"Authorization": f"Bearer {token}"},
        json={"name": "Internet", "amount": 60, "due_date": "2026-09-01"},
    )
    assert response.status_code == 201
    assert response.json()["name"] == "Internet"


def test_transaction_requires_authentication():
    response = client.get("/transactions/")
    assert response.status_code == 401
