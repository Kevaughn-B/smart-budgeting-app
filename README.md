# Smart Budget

A full-stack budgeting app for tracking income and expenses, setting a monthly budget, and receiving bill reminders. The backend is FastAPI + PostgreSQL and the frontend is Next.js.



## Local setup

1. Copy `backend/.env.example` to `backend/.env` and supply local values.
2. Install backend dependencies: `pip install -r backend/requirements.txt`.
3. Run migrations: `cd backend && alembic upgrade head`.
4. Start the API: `uvicorn app.main:app --reload`.
5. In another terminal, install and start the frontend: `cd frontend && npm install && npm run dev`.

### Backend
- cd backend
- python3 -m venv .venv
- source .venv/bin/activate
- pip install -r requirements.txt

- alembic upgrade head
- uvicorn app.main:app --reload

### Frontend
- cd frontend
- npm install
- npm run dev

Set `NEXT_PUBLIC_API_URL=http://localhost:8000` in `frontend/.env.local`.

## Deployment

The included `render.yaml` deploys the API on Render. Add the environment variables listed in `backend/.env.example`, set `CORS_ORIGINS` to the deployed frontend URL, and use a Neon Postgres connection string for `DATABASE_URL`.

Bill reminders are sent through Resend. The `reminders.yml` GitHub Action invokes the protected reminder endpoint daily; add `REMINDER_ENDPOINT` and `REMINDER_JOB_TOKEN` as GitHub Actions secrets.
