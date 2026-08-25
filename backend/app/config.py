import os
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    PROJECT_NAME: str = "AMP VENTURES — Web Development Agency"
    PROJECT_VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    HOST: str = os.getenv("HOST", "127.0.0.1")
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # Agency Information & Credentials
    AGENCY_NAME: str = "AMP VENTURES"
    FOUNDER_NAME: str = "Founder & Lead Architect"
    FOUNDER_CREDENTIALS: str = "IIT Roorkee AI/ML Certified | CCNA"
    WHATSAPP_NUMBER: str = os.getenv("WHATSAPP_NUMBER", "+919876543210")
    
    # External integrations placeholders
    EMAIL_API_KEY: str = os.getenv("EMAIL_API_KEY", "placeholder_smtp_key")
    WHATSAPP_API_TOKEN: str = os.getenv("WHATSAPP_API_TOKEN", "placeholder_whatsapp_token")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "placeholder_openai_key")
    ADMIN_SECRET_KEY: str = os.getenv("ADMIN_SECRET_KEY", "amp_admin_secret_key_2026")
    
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ]

settings = Settings()
