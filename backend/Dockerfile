# ==========================================
# AMP Ventures Backend Dockerfile
# Multi-stage production build for FastAPI
# ==========================================

# --- Stage 1: Build Dependencies ---
FROM python:3.12-slim AS builder

WORKDIR /build

# Install build tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# --- Stage 2: Production Image ---
FROM python:3.12-slim AS final

WORKDIR /app

# Create unprivileged system user
RUN groupadd -r ampuser && useradd -r -g ampuser -d /app -s /sbin/nologin ampuser

# Copy installed wheels from builder
COPY --from=builder /root/.local /home/ampuser/.local
ENV PATH=/home/ampuser/.local/bin:$PATH
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Copy backend application source
COPY . /app

# Ensure correct file permissions for SQLite database writes
RUN chown -R ampuser:ampuser /app

USER ampuser

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD python -c "import urllib.request; exit(0 if urllib.request.urlopen('http://localhost:8000/api/health').getcode() == 200 else 1)"

CMD ["python", "run.py"]
