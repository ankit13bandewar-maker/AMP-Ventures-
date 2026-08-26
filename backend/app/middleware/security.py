from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """
    Production security headers middleware:
    - X-Content-Type-Options: Prevents MIME-sniffing attacks.
    - X-Frame-Options: Protects against Clickjacking.
    - X-XSS-Protection: Legacy XSS filter.
    - Referrer-Policy: Prevents referrer leakage.
    - Permissions-Policy: Restricts browser feature abuse (camera, microphone, geolocation).
    - Strict-Transport-Security: Enforces HTTPS in production.
    """
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        
        headers = response.headers
        headers["X-Content-Type-Options"] = "nosniff"
        headers["X-Frame-Options"] = "DENY"
        headers["X-XSS-Protection"] = "1; mode=block"
        headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        
        # In production HTTPS, send HSTS
        if request.url.scheme == "https":
            headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains; preload"
            
        return response
