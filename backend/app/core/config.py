from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Smart Budget API"
    APP_VERSION: str = "1.0.0"
    ENV: str = "development"

    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"

    class Config:
        env_file = ".env"

settings = Settings()