# Architecture

## Overview

SmartBudget uses a three-tier architecture:

```text
Next.js browser client → FastAPI REST API → PostgreSQL database
                              ↓
                         Resend email API
```

The client stores the short-lived access token in browser local storage and includes it as a bearer token with API requests. FastAPI validates the token and scopes database queries to the authenticated user.

## Components

- **Frontend:** Next.js App Router pages for authentication, dashboard, transactions, analytics, budget, and bills.
- **Backend:** FastAPI routes, Pydantic schemas, SQLAlchemy models, and dependency-based authentication/database sessions.
- **Database:** PostgreSQL in deployment; SQLite may be used for local smoke tests. Alembic owns schema changes.
- **Reminder job:** A scheduled GitHub Actions workflow calls the protected reminder route once daily. The API sends eligible messages to Resend.

## Data model

| Table | Purpose | Main relationships |
| --- | --- | --- |
| `users` | Login identity and password hash | Owns categories, transactions, budget, and bills |
| `categories` | User-specific transaction labels | Belongs to one user; has many transactions |
| `transactions` | Income and expense records | Belongs to one user and category |
| `budgets` | One monthly spending limit and allocation percentages | One-to-one with user |
| `bills` | Scheduled bill reminders | Belongs to one user |

## Lifecycle

1. The user registers; the API hashes the password and creates default categories and a default budget.
2. The user logs in and receives a JWT.
3. Authenticated requests create or query user-owned records.
4. Analytics are calculated from the user's transactions in the client.
5. The daily job authenticates with `REMINDER_JOB_TOKEN`; eligible bills are emailed and then advanced/deactivated.

## Deployment boundary

Render runs the Python API from `backend/`, applies migrations before startup, and exposes `/health`. The Next.js application is deployed separately and receives the public API URL as `NEXT_PUBLIC_API_URL`. CORS allows only configured frontend origins.
