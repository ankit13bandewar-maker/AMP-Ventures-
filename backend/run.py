import uvicorn
import sys
import os

# Add backend directory to sys.path so app module is discoverable
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.config import settings

if __name__ == "__main__":
    print("=" * 60)
    print(f"[*] Starting {settings.PROJECT_NAME} Backend on http://{settings.HOST}:{settings.PORT}")
    print(f"[*] Swagger Interactive API Docs: http://{settings.HOST}:{settings.PORT}/docs")
    print(f"[*] API Health Endpoint: http://{settings.HOST}:{settings.PORT}{settings.API_PREFIX}/health")
    print("=" * 60)
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
