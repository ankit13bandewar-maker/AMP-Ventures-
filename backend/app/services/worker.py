import asyncio
import logging
from typing import Callable, Any, Coroutine

logger = logging.getLogger("amp_ventures")

class BackgroundWorker:
    """
    Robust asynchronous task runner with retry handling and non-blocking background queue execution.
    """
    @staticmethod
    def enqueue(
        task_func: Callable[..., Coroutine[Any, Any, Any]],
        *args,
        retries: int = 3,
        delay_seconds: float = 2.0,
        task_name: str = "background_task",
        **kwargs
    ):
        """Schedule a coroutine to run in the event loop with automatic retries on failure."""
        async def _runner():
            for attempt in range(1, retries + 1):
                try:
                    await task_func(*args, **kwargs)
                    logger.info(f"[WORKER SUCCESS] Task '{task_name}' executed successfully.")
                    return
                except Exception as e:
                    logger.warning(
                        f"[WORKER RETRY] Task '{task_name}' attempt {attempt}/{retries} failed: {e}"
                    )
                    if attempt < retries:
                        await asyncio.sleep(delay_seconds * (2 ** (attempt - 1)))
                    else:
                        logger.error(
                            f"[WORKER EXHAUSTED] Task '{task_name}' permanently failed after {retries} attempts: {e}"
                        )

        asyncio.create_task(_runner())

worker = BackgroundWorker()
