# Security Notes

## Implemented controls

- Passwords are hashed with Passlib's PBKDF2-SHA256 scheme; plain-text passwords are not stored.
- Login issues signed JWTs with a 24-hour expiry.
- Transaction, category, budget, dashboard, and bill routes require bearer authentication.
- Transaction and bill lookups filter by both record ID and authenticated user ID, preventing cross-user access.
- Pydantic validates amounts, dates, transaction types, and input lengths.
- SQLAlchemy parameterizes database access instead of interpolating user input into SQL.
- CORS origins are configured through `CORS_ORIGINS`; use exact deployed frontend URLs in production.
- The reminder processor requires a separate `X-Reminder-Token` so it cannot be triggered anonymously.

## Secrets

Never commit `.env` or `.env.local`. Configure these values in the hosting provider instead:

- `DATABASE_URL`
- `SECRET_KEY`
- `CORS_ORIGINS`
- `REMINDER_JOB_TOKEN`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

`NEXT_PUBLIC_API_URL` is intentionally public because it is bundled into the browser; do not put a secret in it.

## Production checklist

- Use a long random `SECRET_KEY` and rotate it if exposed.
- Use HTTPS URLs only in `CORS_ORIGINS` once deployed.
- Keep the Resend key and reminder token only in Render/GitHub secrets.
- Review dependency updates periodically.
- Add rate limiting, email verification, password reset, and refresh-token revocation before treating the project as a high-security financial product.
