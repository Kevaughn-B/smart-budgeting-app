from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_NAME: str = "Smart Budget API"
    APP_VERSION: str = "1.0.0"
    ENV: str = "development"

    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:3001"
    REMINDER_JOB_TOKEN: str | None = None
    RESEND_API_KEY: str | None = None
    RESEND_FROM_EMAIL: str | None = None

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
