# Test Plan

## Automated checks

Run backend checks from `backend/`:

```bash
pytest tests -q
```

The current API tests cover registration/login, authenticated transaction CRUD, transaction ownership isolation, bill creation, and unauthorized access rejection.

Run frontend checks from `frontend/`:

```bash
npm run lint
npm run build -- --webpack
```

The webpack build command is used locally because the default Turbopack build can be blocked by restricted sandbox environments; both build paths are valid in normal development environments.

## Manual acceptance flow

1. Start the API and frontend as described in the root README.
2. Register a new account and log in.
3. Add income and expense transactions using default categories.
4. Open a transaction, change its amount/date/category, then delete it.
5. Set a monthly budget and confirm it persists after a page refresh.
6. Create a bill reminder and confirm it appears in the bills list; delete it afterward.
7. Confirm dashboard totals and analytics charts reflect the created transactions.
8. Register a second user and confirm the first user's transaction URL returns `404` for the second user.

## Deployment checks

- Run `alembic upgrade head` with the production database before application traffic.
- Confirm `GET /health` returns `{"status":"ok"}`.
- Configure Resend and invoke the reminder workflow manually once with a test bill.
- Confirm the deployed frontend origin is the only production CORS origin.
