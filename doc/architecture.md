# System Architecture

## 1. Overview
The application follows a three-tier architecture:
- Frontend (React)
- Backend (FastAPI)
- Database (PostgreSQL)

## 2. Component Diagram
Frontend communicates with the backend via REST APIs.
Backend interacts with PostgreSQL for data persistence.

## 3. Data Flow
User → Frontend → API → Database → API → Frontend

## 4. Deployment Architecture
- Dockerized services
- CI/CD via GitHub Actions
- Cloud deployment using Render

# Database Design

### users
- id (UUID, primary key)
- username (string)
- email (string, unique)
- password_hash (string)
- created_at (timestamp)
- updated_at (timestamp)

### categories
- id (UUID, primary key)
- name (string)
- user_id (UUID, foreign key - users.id)
- created_at (timestamp)

### expenses
- id (UUID, primary key)
- user_id (UUID, foreign key - users.id)
- category_id (UUID, foreign key - categories.id)
- amount (decimal)
- description (string)
- expense_date (date)
- created_at (timestamp)

### budgets
- id (UUID, primary key)
- user_id (UUID, foreign key - users.id)
- category_id (UUID, foreign key - categories.id)
- monthly_limit (decimal)
- month (date, e.g. 2025-01-01)
- created_at (timestamp)
