### Database Design

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
