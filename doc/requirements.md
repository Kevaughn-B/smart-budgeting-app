# Requirements

## Product overview

SmartBudget is a web application that helps an individual track income and expenses, maintain a monthly spending limit, review spending analytics, and schedule bill-reminder emails.

## Functional requirements

### Authentication

- Users can register with a unique email address and password of at least eight characters.
- Users can log in with email and password and receive a 24-hour bearer token.
- Protected data is available only to the authenticated owner.

### Transactions and categories

- A user can create income and expense transactions with an amount, category, description, and date.
- A user can view, update, and delete only their own transactions.
- New accounts receive default categories: Salary, Rent, Groceries, Utilities, and Entertainment.
- Users can create additional categories through the API.

### Budget and analytics

- A user can set one monthly spending limit.
- The dashboard shows total income, expenses, and balance.
- Analytics shows an expense breakdown by category and income grouped by month.

### Bill reminders

- A user can create and delete bill reminders with a due date and reminder lead time.
- A recurring bill rolls forward one calendar month after a reminder is sent. A non-recurring bill is deactivated after its reminder is sent.
- The protected reminder job sends eligible emails through Resend and prevents duplicate sends for the same due date.

## Non-functional requirements

- FastAPI validates request payloads and JWT-protects private routes.
- Secrets are supplied through environment variables and are never committed.
- The frontend is responsive for common desktop and mobile widths.
- The database schema is versioned with Alembic migrations.
- CI runs backend tests plus frontend lint and production build checks.

## Constraints and assumptions

- The application supports USD display formatting only.
- The initial version has no bank integrations, investment tracking, password reset flow, or native mobile app.
- Email delivery requires a Resend account, API key, and verified sending domain for recipients other than the account owner.
- A free Render service may sleep; it is suitable for a portfolio/demo deployment, not a guaranteed always-on service.

## Acceptance criteria

- A new user can complete registration, login, transaction CRUD, budget update, analytics review, and bill creation locally.
- One user cannot retrieve, edit, or delete another user's transaction.
- `alembic upgrade head`, backend tests, frontend lint, and frontend production build succeed.
- Deployment configuration and required variables are documented before publishing.
