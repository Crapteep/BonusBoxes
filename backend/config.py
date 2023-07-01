from pydantic import BaseSettings
from functools import lru_cache
import os


class Settings(BaseSettings):
    env_name: str = "Development"
    base_url: str = "http://localhost:8000"
    db_url: str = "mongodb://localhost:27017"

    class Config:
        env_file = ".env"
    

@lru_cache
def get_settings() -> Settings:

    env_name = os.getenv("ENV_NAME", "").lower()

    if env_name == "production":
        Settings.Config.env_file = ".env.production"

    settings = Settings()
    print(f"Loading settings for: {settings.env_name}")
    return settings
