import os
from typing import List
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    PROJECT_NAME: str = "AMP VENTURES — Web Development Agency"
    PROJECT_VERSION: str = "1.3.0"
    API_PREFIX: str = "/api"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = os.getenv("DEBUG", "false").lower() in ("true", "1", "yes")
    HOST: str = os.getenv("HOST", "127.0.0.1")
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # Agency Information & Credentials
    AGENCY_NAME: str = "AMP VENTURES"
    FOUNDER_NAME: str = "Founder & Lead Architect"
    FOUNDER_CREDENTIALS: str = "IIT Roorkee AI/ML Certified | CCNA"
    WHATSAPP_NUMBER: str = os.getenv("WHATSAPP_NUMBER", "+917000384330")
    
    # Security & Admin Authentication
    ADMIN_SECRET_KEY: str = os.getenv("ADMIN_SECRET_KEY", "amp_admin_secret_key_2026")
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "amp_ventures_secure_jwt_secret_key_change_in_production")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440")) # 24 hours
    RATE_LIMIT_PER_MINUTE: int = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))
    
    # Database & Supabase Integration
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", os.getenv("SUPABASE_ANON_KEY", os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")))
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    DATABASE_ENGINE: str = os.getenv("DATABASE_ENGINE", "auto") # auto | supabase | sqlite
    
    # Redis / Distributed Cache (Optional)
    REDIS_URL: str = os.getenv("REDIS_URL", "")
    CACHE_DEFAULT_TTL_SECONDS: int = int(os.getenv("CACHE_DEFAULT_TTL_SECONDS", "300"))
    
    # Email & SMTP Settings
    SMTP_HOST: str = os.getenv("SMTP_HOST", "smtp.gmail.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER: str = os.getenv("SMTP_USER", "contact@ampventures.agency")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    NOTIFICATION_EMAIL_TO: str = os.getenv("NOTIFICATION_EMAIL_TO", "contact@ampventures.agency")
    
    # Instant Mobile Notification Webhooks
    DISCORD_WEBHOOK_URL: str = os.getenv("DISCORD_WEBHOOK_URL", "")
    TELEGRAM_BOT_TOKEN: str = os.getenv("TELEGRAM_BOT_TOKEN", "")
    TELEGRAM_CHAT_ID: str = os.getenv("TELEGRAM_CHAT_ID", "")
    
    # AI LLM Provider Keys
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    # Observability & Monitoring
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    PROMETHEUS_ENABLED: bool = os.getenv("PROMETHEUS_ENABLED", "true").lower() in ("true", "1", "yes")
    SENTRY_DSN: str = os.getenv("SENTRY_DSN", "")
    
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ]

settings = Settings()
