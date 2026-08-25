from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone

router = APIRouter()

# Data Models
class MessageRequest(BaseModel):
    name: str = Field(..., min_length=2, example="Alice")
    email: str = Field(..., example="alice@example.com")
    message: str = Field(..., min_length=5, example="Hello from React!")

class ProjectFeature(BaseModel):
    id: int
    title: str
    description: str
    icon: str
    category: str
    badge: Optional[str] = None

# In-memory storage for demo interactions
MESSAGES_DB: List[dict] = []

FEATURES_DB: List[ProjectFeature] = [
    ProjectFeature(
        id=1,
        title="FastAPI High-Performance Engine",
        description="Built on Starlette & Pydantic with asynchronous request processing and auto-generated OpenAPI documentation.",
        icon="⚡",
        category="Backend",
        badge="Python 3.14"
    ),
    ProjectFeature(
        id=2,
        title="Vite + React Interactive UI",
        description="Ultra-fast hot module replacement, responsive state management, and modern component architecture.",
        icon="⚛️",
        category="Frontend",
        badge="React 18"
    ),
    ProjectFeature(
        id=3,
        title="Bespoke Design System",
        description="Crafted with glassmorphism, responsive CSS variables, dynamic glowing gradients, and fluid micro-animations.",
        icon="🎨",
        category="Styling",
        badge="Modern CSS"
    ),
    ProjectFeature(
        id=4,
        title="RESTful API & CORS Ready",
        description="Seamless asynchronous client-server communication with pre-configured cross-origin resource sharing.",
        icon="🌐",
        category="Architecture",
        badge="REST API"
    ),
    ProjectFeature(
        id=5,
        title="Real-Time Health Monitoring",
        description="Automated uptime, system latency, and memory monitoring endpoint with JSON telemetry.",
        icon="📊",
        category="DevOps",
        badge="Live Telemetry"
    ),
    ProjectFeature(
        id=6,
        title="Modular Extensible Design",
        description="Easily integrate SQL databases (PostgreSQL/SQLite), authentication (JWT/OAuth), and background tasks.",
        icon="🧩",
        category="Extensibility",
        badge="Production-Ready"
    )
]

@router.get("/health")
async def health_check():
    """Health check endpoint to verify backend operational status."""
    return {
        "status": "online",
        "service": "Python FastAPI Backend",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "uptime": "Operational",
        "version": "1.0.0"
    }

@router.get("/stats")
async def get_stats():
    """Get project live telemetry and overview statistics."""
    return {
        "frameworks": ["FastAPI", "React", "Vite", "Modern CSS"],
        "total_features": len(FEATURES_DB),
        "messages_received": len(MESSAGES_DB),
        "latency_ms": 12,
        "environment": "Development"
    }

@router.get("/features", response_model=List[ProjectFeature])
async def get_features(category: Optional[str] = None):
    """Retrieve list of platform features with optional category filter."""
    if category:
        filtered = [f for f in FEATURES_DB if f.category.lower() == category.lower()]
        return filtered
    return FEATURES_DB

@router.post("/contact")
async def submit_contact(payload: MessageRequest):
    """Submit a message from the React frontend."""
    message_entry = {
        "id": len(MESSAGES_DB) + 1,
        "name": payload.name,
        "email": payload.email,
        "message": payload.message,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    MESSAGES_DB.append(message_entry)
    return {
        "success": True,
        "message": f"Thank you {payload.name}, your message has been received by the Python backend!",
        "data": message_entry
    }

@router.get("/messages")
async def get_messages():
    """Retrieve list of submitted messages."""
    return {
        "count": len(MESSAGES_DB),
        "messages": list(reversed(MESSAGES_DB))
    }
