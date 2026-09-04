# Deployment Strategy

## Render API

Create or update a Render Blueprint from `render.yaml`. The service uses `backend` as its root directory, runs Alembic before startup, and exposes `/health` for health checks.

Configure these Render environment variables:

- `DATABASE_URL`: Neon Postgres connection string with `sslmode=require`
- `CORS_ORIGINS`: comma-separated frontend URLs
- `RESEND_API_KEY` and `RESEND_FROM_EMAIL`: required for bill reminders

Render generates `SECRET_KEY` and `REMINDER_JOB_TOKEN` from the Blueprint. Copy the reminder token into the GitHub Actions secret of the same name. Do not copy a value from `.env` to source control.

## Frontend

Deploy the Next.js app separately. Set `NEXT_PUBLIC_API_URL` to the public Render API URL at build time. The variable is public and must not contain a secret.

## Reminder schedule

GitHub Actions runs at 12:00 UTC daily and calls `POST /bills/process-reminders`. Configure:

- `REMINDER_ENDPOINT`: e.g. `https://smart-budget-api.onrender.com`
- `REMINDER_JOB_TOKEN`: the same value configured in Render

This approach works on Render's free tier because it does not need a continuously running worker.
