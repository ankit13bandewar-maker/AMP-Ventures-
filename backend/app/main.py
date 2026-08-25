from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.db import init_db
from app.routes.contact import router as contact_router
from app.routes.readiness import router as readiness_router
from app.routes.chatbot import router as chatbot_router
from app.routes.portfolio import router as portfolio_router
from app.routes.mockup import router as mockup_router
from datetime import datetime, timezone

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure SQLite tables exist
    init_db()
    print(f"[*] {settings.PROJECT_NAME} Backend initialized successfully with SQLite persistence.")
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="Decoupled high-performance FastAPI backend supporting the AMP Ventures Agency Frontend.",
    lifespan=lifespan
)

# Configure Cross-Origin Resource Sharing (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API route modules
app.include_router(contact_router, prefix=settings.API_PREFIX, tags=["Contact & Leads"])
app.include_router(readiness_router, prefix=settings.API_PREFIX, tags=["Digital Readiness Score"])
app.include_router(chatbot_router, prefix=settings.API_PREFIX, tags=["AI Chatbot"])
app.include_router(portfolio_router, prefix=settings.API_PREFIX, tags=["Portfolio"])
app.include_router(mockup_router, prefix=settings.API_PREFIX, tags=["Mockup Generator"])


@app.get(f"{settings.API_PREFIX}/health", tags=["System"])
async def health_check():
    """Health check endpoint to verify backend operational status."""
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "founder_credentials": settings.FOUNDER_CREDENTIALS,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "uptime": "Operational",
        "version": settings.PROJECT_VERSION
    }

@app.get("/")
async def root():
    return {
        "message": f"🚀 {settings.PROJECT_NAME} Backend is active!",
        "docs_url": "/docs",
        "health": f"{settings.API_PREFIX}/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
