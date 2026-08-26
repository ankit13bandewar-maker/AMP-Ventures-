import time
import hmac
import hashlib
import json
import base64
from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any
from enum import Enum
from pydantic import BaseModel, Field
from fastapi import APIRouter, Header, Query, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.config import settings

# Optional PyJWT with pure python HMAC fallback
try:
    import jwt
    HAS_PYJWT = True
except ImportError:
    HAS_PYJWT = False

class Role(str, Enum):
    ADMIN = "admin"
    EDITOR = "editor"
    VIEWER = "viewer"

class TokenRequest(BaseModel):
    admin_key: str = Field(..., description="Admin secret key to authenticate")
    expires_in_minutes: Optional[int] = Field(default=None, description="Custom expiration time in minutes")

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    role: str = "admin"

security_bearer = HTTPBearer(auto_error=False)
auth_router = APIRouter(prefix="/auth", tags=["Authentication & Security"])

def _b64_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode('utf-8').rstrip('=')

def _b64_decode(data: str) -> bytes:
    padding = '=' * (4 - len(data) % 4) if len(data) % 4 != 0 else ''
    return base64.urlsafe_b64decode(data + padding)

def create_access_token(payload_data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """Generate a signed JWT token using PyJWT or HMAC-SHA256 fallback."""
    to_encode = payload_data.copy()
    expire_minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES
    expire_time = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=expire_minutes))
    
    to_encode.update({
        "exp": int(expire_time.timestamp()),
        "iat": int(datetime.now(timezone.utc).timestamp()),
        "iss": settings.AGENCY_NAME
    })

    if HAS_PYJWT:
        return jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    
    # Pure Python fallback HMAC-SHA256 JWT
    header = {"alg": "HS256", "typ": "JWT"}
    hdr_b64 = _b64_encode(json.dumps(header).encode('utf-8'))
    payload_b64 = _b64_encode(json.dumps(to_encode).encode('utf-8'))
    message = f"{hdr_b64}.{payload_b64}".encode('utf-8')
    signature = hmac.new(settings.JWT_SECRET_KEY.encode('utf-8'), message, hashlib.sha256).digest()
    sig_b64 = _b64_encode(signature)
    return f"{hdr_b64}.{payload_b64}.{sig_b64}"

def decode_access_token(token: str) -> Dict[str, Any]:
    """Decode and validate a JWT access token."""
    if HAS_PYJWT:
        try:
            return jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Access token has expired. Please authenticate again.",
                headers={"WWW-Authenticate": "Bearer"}
            )
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token signature or malformed token.",
                headers={"WWW-Authenticate": "Bearer"}
            )

    # Pure Python HMAC fallback verification
    parts = token.split('.')
    if len(parts) != 3:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token structure.")
    
    hdr_b64, payload_b64, sig_b64 = parts
    message = f"{hdr_b64}.{payload_b64}".encode('utf-8')
    expected_sig = _b64_encode(hmac.new(settings.JWT_SECRET_KEY.encode('utf-8'), message, hashlib.sha256).digest())

    if not hmac.compare_digest(sig_b64, expected_sig):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid signature.")

    try:
        payload = json.loads(_b64_decode(payload_b64).decode('utf-8'))
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Malformed payload.")

    exp = payload.get("exp")
    if exp and exp < time.time():
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired.")

    return payload

def get_current_admin(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_bearer),
    x_admin_key: Optional[str] = Header(None, alias="X-Admin-Key"),
    admin_key: Optional[str] = Query(None)
) -> Dict[str, Any]:
    """
    Multi-scheme authentication dependency:
    1. Authorization Bearer <JWT>
    2. X-Admin-Key Header
    3. ?admin_key= Query parameter
    """
    expected_key = settings.ADMIN_SECRET_KEY or "amp_admin_secret_key_2026"

    # 1. Bearer JWT validation
    if credentials and credentials.scheme.lower() == "bearer":
        payload = decode_access_token(credentials.credentials)
        if payload.get("role") in [Role.ADMIN.value, Role.EDITOR.value]:
            return payload

    # 2. Header or query param secret key validation
    provided_key = x_admin_key or admin_key
    if provided_key and hmac.compare_digest(provided_key, expected_key):
        return {
            "sub": "master_admin",
            "role": Role.ADMIN.value,
            "auth_method": "secret_key"
        }

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized. Provide valid Bearer JWT, 'X-Admin-Key' header, or '?admin_key=' query parameter.",
        headers={"WWW-Authenticate": "Bearer"}
    )

def verify_admin_key(admin_session: Dict[str, Any] = Depends(get_current_admin)) -> bool:
    """Backwards-compatible dependency for existing router routes."""
    return True

@auth_router.post("/token", response_model=TokenResponse)
async def login_for_access_token(payload: TokenRequest):
    """
    Exchange Admin Secret Key for a signed JWT Bearer Token.
    """
    expected_key = settings.ADMIN_SECRET_KEY or "amp_admin_secret_key_2026"
    if not hmac.compare_digest(payload.admin_key, expected_key):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Admin Secret Key.",
            headers={"WWW-Authenticate": "Bearer"}
        )

    expire_mins = payload.expires_in_minutes or settings.ACCESS_TOKEN_EXPIRE_MINUTES
    access_token = create_access_token(
        payload_data={"sub": "agency_admin", "role": Role.ADMIN.value},
        expires_delta=timedelta(minutes=expire_mins)
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=expire_mins * 60,
        role=Role.ADMIN.value
    )

@auth_router.get("/me")
async def get_current_user_profile(admin_session: Dict[str, Any] = Depends(get_current_admin)):
    """
    Inspect the currently authenticated session and permissions.
    """
    return {
        "authenticated": True,
        "session": admin_session,
        "founder": settings.FOUNDER_CREDENTIALS,
        "agency": settings.AGENCY_NAME
    }
