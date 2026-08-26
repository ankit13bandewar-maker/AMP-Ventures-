import time
import logging
from collections import defaultdict, deque
from typing import Optional
from fastapi import Request, HTTPException, status
from app.config import settings

logger = logging.getLogger("amp_ventures")

# Optional Redis connection for distributed rate limiting
_redis_client = None
if settings.REDIS_URL:
    try:
        import redis
        _redis_client = redis.Redis.from_url(settings.REDIS_URL, decode_responses=True)
        _redis_client.ping()
        logger.info("[RATE LIMITER] Connected to Redis for distributed rate limiting.")
    except Exception as e:
        logger.warning(f"[RATE LIMITER] Redis connection failed ({e}), falling back to in-memory limiter.")
        _redis_client = None

class RateLimiter:
    """
    Sliding window rate limiter with Redis backend support and In-Memory deque fallback.
    """
    def __init__(self, requests_per_minute: int = 60):
        self.requests_per_minute = requests_per_minute
        self.client_history = defaultdict(deque)

    def get_client_ip(self, request: Request) -> str:
        # Check X-Forwarded-For header in reverse proxy (Nginx, Cloudflare)
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            return forwarded.split(",")[0].strip()
        return request.client.host if request.client else "127.0.0.1"

    def check(self, request: Request, limit: Optional[int] = None):
        max_requests = limit or self.requests_per_minute
        client_ip = self.get_client_ip(request)
        now = time.time()
        
        # 1. Distributed Redis Rate Limiter
        if _redis_client:
            try:
                key = f"rate_limit:{client_ip}"
                current_count = _redis_client.incr(key)
                if current_count == 1:
                    _redis_client.expire(key, 60)
                
                if current_count > max_requests:
                    ttl = _redis_client.ttl(key)
                    raise HTTPException(
                        status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                        detail=f"Rate limit exceeded ({max_requests}/min). Please retry after {ttl} seconds.",
                        headers={"Retry-After": str(max(1, ttl))}
                    )
                return
            except HTTPException:
                raise
            except Exception as e:
                logger.error(f"[RATE LIMITER REDIS ERROR] {e}, using in-memory fallback.")

        # 2. Local In-Memory Sliding Window
        window_start = now - 60.0
        history = self.client_history[client_ip]

        # Evict timestamps outside 60s window
        while history and history[0] < window_start:
            history.popleft()

        if len(history) >= max_requests:
            retry_after = int(60 - (now - history[0])) if history else 60
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Too many requests. Limit is {max_requests} requests per minute.",
                headers={"Retry-After": str(max(1, retry_after))}
            )

        history.append(now)

limiter = RateLimiter(requests_per_minute=settings.RATE_LIMIT_PER_MINUTE)
