import time
from datetime import datetime, timezone
from contextlib import asynccontextmanager
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.db import init_db, get_db_connection
from app.logger import logger
from app.auth import auth_router
from app.routes.contact import router as contact_router
from app.routes.readiness import router as readiness_router
from app.routes.chatbot import router as chatbot_router
from app.routes.portfolio import router as portfolio_router
from app.routes.mockup import router as mockup_router
from app.middleware.security import SecurityHeadersMiddleware
from app.middleware.telemetry import TelemetryMiddleware
from app.services.metrics import get_metrics_response

_START_TIME = time.time()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure SQLite tables exist
    init_db()
    logger.info(f"[*] {settings.PROJECT_NAME} (v{settings.PROJECT_VERSION}) initialized successfully in [{settings.ENVIRONMENT.upper()}] mode.")
    yield
    logger.info(f"[*] {settings.PROJECT_NAME} Backend shutting down cleanly.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="Decoupled high-performance FastAPI backend supporting the AMP Ventures Agency Frontend.",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan
)

# 1. Telemetry Middleware (Correlation IDs, Process Timing, Metrics)
app.add_middleware(TelemetryMiddleware)

# 2. Security Headers Middleware (CSP, Clickjacking & MIME-type defense)
app.add_middleware(SecurityHeadersMiddleware)

# 3. Cross-Origin Resource Sharing (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Route Modules
app.include_router(auth_router, prefix=settings.API_PREFIX)
app.include_router(contact_router, prefix=settings.API_PREFIX, tags=["Contact & Leads"])
app.include_router(readiness_router, prefix=settings.API_PREFIX, tags=["Digital Readiness Score"])
app.include_router(chatbot_router, prefix=settings.API_PREFIX, tags=["AI Chatbot"])
app.include_router(portfolio_router, prefix=settings.API_PREFIX, tags=["Portfolio"])
app.include_router(mockup_router, prefix=settings.API_PREFIX, tags=["Mockup Generator"])

@app.get(f"{settings.API_PREFIX}/health", tags=["System"])
async def health_check():
    """
    Active Health Check endpoint:
    Probes real SQLite database connectivity, measures query latency,
    and returns uptime and system status.
    """
    db_status = "healthy"
    db_latency_ms = 0.0
    
    t0 = time.perf_counter()
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        cursor.fetchone()
        conn.close()
        db_latency_ms = round((time.perf_counter() - t0) * 1000, 2)
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"
        logger.error(f"[HEALTH CHECK ERROR] Database probe failed: {e}")

    uptime_seconds = int(time.time() - _START_TIME)

    return {
        "status": "online" if db_status == "healthy" else "degraded",
        "service": settings.PROJECT_NAME,
        "version": settings.PROJECT_VERSION,
        "environment": settings.ENVIRONMENT,
        "founder_credentials": settings.FOUNDER_CREDENTIALS,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "uptime_seconds": uptime_seconds,
        "database": {
            "engine": "SQLite3",
            "status": db_status,
            "latency_ms": db_latency_ms
        },
        "features": {
            "jwt_auth": True,
            "rate_limiter": True,
            "security_headers": True,
            "cache_layer": True,
            "telemetry_metrics": True
        }
    }

@app.get("/metrics", tags=["System"], summary="Prometheus Metrics Exporter")
async def prometheus_metrics():
    """Expose Prometheus telemetry metrics for scraping (e.g. Grafana / Prometheus)."""
    return get_metrics_response()

@app.get("/")
async def root():
    return {
        "message": f"🚀 {settings.PROJECT_NAME} Backend is active!",
        "docs_url": "/docs",
        "health": f"{settings.API_PREFIX}/health",
        "metrics": "/metrics"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
