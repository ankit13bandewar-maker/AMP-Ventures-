import time
from typing import Dict
from starlette.responses import Response

try:
    from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST
    HAS_PROMETHEUS_LIB = True

    HTTP_REQUESTS_TOTAL = Counter(
        "http_requests_total",
        "Total number of HTTP requests processed",
        ["method", "endpoint", "status_code"]
    )
    HTTP_REQUEST_DURATION_SECONDS = Histogram(
        "http_request_duration_seconds",
        "HTTP request latency in seconds",
        ["method", "endpoint"]
    )
except ImportError:
    HAS_PROMETHEUS_LIB = False
    HTTP_REQUESTS_TOTAL = None
    HTTP_REQUEST_DURATION_SECONDS = None

# Pure Python in-memory metrics fallback
_request_counts: Dict[str, int] = {}
_latencies: list = []

def record_http_metric(method: str, endpoint: str, status_code: int, duration_seconds: float):
    """Record an incoming HTTP request execution metric."""
    if HAS_PROMETHEUS_LIB and HTTP_REQUESTS_TOTAL and HTTP_REQUEST_DURATION_SECONDS:
        try:
            HTTP_REQUESTS_TOTAL.labels(method=method, endpoint=endpoint, status_code=str(status_code)).inc()
            HTTP_REQUEST_DURATION_SECONDS.labels(method=method, endpoint=endpoint).observe(duration_seconds)
            return
        except Exception:
            pass

    # Fallback storage
    key = f'{method}:{endpoint}:{status_code}'
    _request_counts[key] = _request_counts.get(key, 0) + 1
    if len(_latencies) < 1000:
        _latencies.append(duration_seconds)

def get_metrics_response() -> Response:
    """Export metrics in standard Prometheus OpenMetrics text format."""
    if HAS_PROMETHEUS_LIB:
        return Response(content=generate_latest(), media_type=CONTENT_TYPE_LATEST)

    # Pure text prometheus exposition format fallback
    lines = [
        "# HELP http_requests_total Total number of HTTP requests processed",
        "# TYPE http_requests_total counter"
    ]
    for key, count in _request_counts.items():
        parts = key.split(":")
        method, endpoint, status_code = parts[0], parts[1], parts[2]
        lines.append(f'http_requests_total{{method="{method}",endpoint="{endpoint}",status_code="{status_code}"}} {count}')

    avg_latency = (sum(_latencies) / len(_latencies)) if _latencies else 0.0
    lines.extend([
        "# HELP http_request_latency_avg_seconds Average request latency in seconds",
        "# TYPE http_request_latency_avg_seconds gauge",
        f"http_request_latency_avg_seconds {avg_latency:.6f}"
    ])

    return Response(content="\n".join(lines) + "\n", media_type="text/plain; version=0.0.4")
