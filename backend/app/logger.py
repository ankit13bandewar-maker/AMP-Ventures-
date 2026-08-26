import sys
import logging
from app.config import settings

def setup_logger():
    """Configure structured logging for AMP Ventures backend."""
    logger = logging.getLogger("amp_ventures")
    
    # Avoid duplicate handlers if reloaded
    if logger.hasHandlers():
        return logger

    log_level = getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO)
    logger.setLevel(log_level)

    # Console stream handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(log_level)

    # Format: [2026-08-26 01:50:00] [INFO] [amp_ventures] Message
    formatter = logging.Formatter(
        fmt="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

    # Prevent root propagation duplicates
    logger.propagate = False
    return logger

logger = setup_logger()
