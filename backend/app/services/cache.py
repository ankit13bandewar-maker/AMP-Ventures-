import time
import json
import functools
import logging
from typing import Any, Optional, Callable
from app.config import settings

logger = logging.getLogger("amp_ventures")

# Optional Redis Cache backend
_redis_cache = None
if settings.REDIS_URL:
    try:
        import redis
        _redis_cache = redis.Redis.from_url(settings.REDIS_URL, decode_responses=True)
        _redis_cache.ping()
        logger.info("[CACHE] Redis caching backend connected successfully.")
    except Exception as e:
        logger.warning(f"[CACHE] Redis cache unreachable ({e}), using in-memory TTL cache.")
        _redis_cache = None

class InMemoryTTLCache:
    """Thread-safe in-memory cache with Time-To-Live (TTL) expiration."""
    def __init__(self, default_ttl: int = 300):
        self.default_ttl = default_ttl
        self._store = {}

    def get(self, key: str) -> Optional[Any]:
        if key in self._store:
            val, expiry = self._store[key]
            if time.time() < expiry:
                return val
            # Expired
            del self._store[key]
        return None

    def set(self, key: str, value: Any, ttl: Optional[int] = None):
        expiry = time.time() + (ttl or self.default_ttl)
        self._store[key] = (value, expiry)

    def delete(self, key: str):
        self._store.pop(key, None)

    def clear(self):
        self._store.clear()

cache_store = InMemoryTTLCache(default_ttl=settings.CACHE_DEFAULT_TTL_SECONDS)

def get_cache(key: str) -> Optional[Any]:
    """Retrieve value from Redis or In-Memory cache."""
    if _redis_cache:
        try:
            val = _redis_cache.get(key)
            if val is not None:
                return json.loads(val)
        except Exception as e:
            logger.error(f"[CACHE ERROR] Redis get failed: {e}")
    return cache_store.get(key)

def set_cache(key: str, value: Any, ttl: Optional[int] = None):
    """Store value in Redis or In-Memory cache."""
    effective_ttl = ttl or settings.CACHE_DEFAULT_TTL_SECONDS
    if _redis_cache:
        try:
            _redis_cache.setex(key, effective_ttl, json.dumps(value))
            return
        except Exception as e:
            logger.error(f"[CACHE ERROR] Redis set failed: {e}")
    cache_store.set(key, value, ttl=effective_ttl)

def invalidate_cache(key: str):
    """Remove key from both caches."""
    if _redis_cache:
        try:
            _redis_cache.delete(key)
        except Exception:
            pass
    cache_store.delete(key)

def cached(ttl_seconds: int = 300, key_prefix: str = "cache"):
    """
    Decorator for caching asynchronous and synchronous function responses.
    """
    def decorator(func: Callable):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            # Serialize arguments to create unique cache key
            args_str = json.dumps(args, default=str)
            kwargs_str = json.dumps(kwargs, default=str, sort_keys=True)
            cache_key = f"{key_prefix}:{func.__name__}:{hash(args_str + kwargs_str)}"
            
            cached_val = get_cache(cache_key)
            if cached_val is not None:
                return cached_val

            result = await func(*args, **kwargs) if asyncio_iscoroutinefunction(func) else func(*args, **kwargs)
            set_cache(cache_key, result, ttl=ttl_seconds)
            return result
        return wrapper
    return decorator

def asyncio_iscoroutinefunction(func):
    import inspect
    return inspect.iscoroutinefunction(func)
