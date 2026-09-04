# API Specification

Base URL: `http://localhost:8000` locally. Protected endpoints require `Authorization: Bearer <access_token>`.

## System and authentication

| Method | Path | Description |
| --- | --- | --- |
| GET | `/` | API status message |
| GET | `/health` | Health check for Render |
| POST | `/auth/register` | Create a user; JSON `{ "email", "password" }` |
| POST | `/auth/login` | OAuth form body `username` and `password`; returns access token |

## Categories

| Method | Path | Description |
| --- | --- | --- |
| GET | `/categories/` | List the current user's categories |
| POST | `/categories/` | Create a category with `{ "name" }` |

## Transactions

Transaction create/update payload:

```json
{
  "amount": 42.50,
  "type": "expense",
  "category_id": 1,
  "description": "Groceries",
  "transaction_date": "2026-09-03"
}
```

| Method | Path | Description |
| --- | --- | --- |
| GET | `/transactions/` | List current user's transactions, newest first |
| POST | `/transactions/` | Create transaction |
| GET | `/transactions/{id}` | Read an owned transaction |
| PUT | `/transactions/{id}` | Update an owned transaction |
| DELETE | `/transactions/{id}` | Delete an owned transaction |
| GET | `/transactions/summary` | Return total income, expenses, and balance |
| GET | `/transactions/analysis` | Return total budget analysis |

## Budget and dashboard

| Method | Path | Description |
| --- | --- | --- |
| GET | `/budget/` | Read current user's budget |
| PUT | `/budget/` | Update with `{ "monthly_limit": 1000 }` |
| GET | `/dashboard/` | Return income, expenses, balance, and transaction count |

## Bills and reminders

Bill create payload:

```json
{
  "name": "Internet",
  "amount": 60,
  "due_date": "2026-09-15",
  "reminder_days_before": 3,
  "is_recurring": true
}
```

| Method | Path | Description |
| --- | --- | --- |
| GET | `/bills/` | List current user's reminders |
| POST | `/bills/` | Create reminder |
| DELETE | `/bills/{id}` | Delete owned reminder |
| POST | `/bills/process-reminders` | Scheduled job; requires `X-Reminder-Token` |

Validation errors return `422`; invalid credentials return `401`; owned resources that cannot be found return `404`.
