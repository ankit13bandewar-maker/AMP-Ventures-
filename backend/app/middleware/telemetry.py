import time
import uuid
import logging
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from app.services.metrics import record_http_metric

logger = logging.getLogger("amp_ventures")

class TelemetryMiddleware(BaseHTTPMiddleware):
    """
    Middleware to inject request correlation IDs, measure processing latency,
    record Prometheus metrics, and log structured request summaries.
    """
    async def dispatch(self, request: Request, call_next):
        request_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())[:8]
        start_time = time.perf_counter()
        
        try:
            response: Response = await call_next(request)
        except Exception as exc:
            duration = time.perf_counter() - start_time
            record_http_metric(
                method=request.method,
                endpoint=request.url.path,
                status_code=500,
                duration_seconds=duration
            )
            logger.error(
                f"[{request_id}] 500 {request.method} {request.url.path} - Exception: {exc} ({duration*1000:.2f}ms)"
            )
            raise exc

        duration = time.perf_counter() - start_time
        duration_ms = duration * 1000.0

        # Inject telemetry headers
        response.headers["X-Request-ID"] = request_id
        response.headers["X-Process-Time-Ms"] = f"{duration_ms:.2f}"

        # Record metrics
        record_http_metric(
            method=request.method,
            endpoint=request.url.path,
            status_code=response.status_code,
            duration_seconds=duration
        )

        # Log non-static requests
        if not request.url.path.startswith("/static"):
            logger.info(
                f"[{request_id}] {response.status_code} {request.method} {request.url.path} ({duration_ms:.2f}ms)"
            )

        return response
