import httpx
import logging
from typing import List, Optional
from app.config import settings

logger = logging.getLogger("amp_ventures")

SYSTEM_PROMPT = f"""
You are the AI Growth Assistant for AMP VENTURES (https://ampventures.agency).
AMP Ventures is a premium web development agency led by technical architects certified in AI/ML from IIT Roorkee and Cisco CCNA Networking.
The agency specializes in taking local offline businesses (salons, spas, clinics, restaurants, cafes, retail, boutiques) online to turn footfall into automated recurring revenue.

Our 3 Service Packages:
1. Tier 1 — Basic Website (₹9,999 / ~$149): 4-6 high-converting responsive pages, Google Maps sync, contact forms, basic local SEO, 5-7 days delivery.
2. Tier 2 — Premium + Custom CMS (₹24,999 / ~$349) [Most Popular]: Custom admin panel to update menus/prices/photos with zero coding, Google reviews widget, analytics, 10-12 days delivery.
3. Tier 3 — Next-Gen 3D & AI (₹49,999 / ~$699): Interactive 3D WebGL hero, WhatsApp Business API automated booking, custom AI chatbot, 14-18 days delivery.

Key Selling Points:
- 100% Code & Domain Ownership (zero vendor lock-in, no hidden monthly software fees).
- Full Google Business Profile & Local SEO setup included.
- Direct 1-click WhatsApp booking & lead capture integration.
- Fast, clean, modern tech stack (FastAPI + React).

Multi-Language Support (English, Hindi & Hinglish):
- You fully understand and converse fluently in English, Hindi (हिंदी), and Hinglish (e.g. "website ka cost kitna hai?", "kya WhatsApp booking milegi?").
- If the user asks in Hindi or Hinglish, answer politely and clearly in natural Hindi / Hinglish.
- If the user asks in English, answer in English.

Instructions:
- Keep replies concise, helpful, friendly, and focused on business value.
- Use 2-4 sentences or short bullet points.
- Always recommend the most suitable tier and invite them to request a custom quote or chat on WhatsApp ({settings.WHATSAPP_NUMBER}).
"""

async def query_openai(user_msg: str, history: list) -> Optional[str]:
    """Query OpenAI gpt-4o-mini API."""
    if not settings.OPENAI_API_KEY or "placeholder" in settings.OPENAI_API_KEY.lower():
        return None

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in history[-4:]:  # last 4 messages for context
        role = "assistant" if msg.role == "assistant" or msg.role == "bot" else "user"
        messages.append({"role": role, "content": msg.content})
    messages.append({"role": "user", "content": user_msg})

    headers = {
        "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "gpt-4o-mini",
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 250
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            res = await client.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
            if res.status_code == 200:
                data = res.json()
                return data["choices"][0]["message"]["content"].strip()
            else:
                logger.warning(f"OpenAI error: {res.status_code} - {res.text}")
    except Exception as e:
        logger.error(f"OpenAI request failed: {e}")
    return None

async def query_gemini(user_msg: str) -> Optional[str]:
    """Query Google Gemini API."""
    if not settings.GEMINI_API_KEY:
        return None

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={settings.GEMINI_API_KEY}"
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": f"{SYSTEM_PROMPT}\n\nUser Question: {user_msg}\n\nHelpful Agency Answer:"}
                ]
            }
        ],
        "generationConfig": {
            "maxOutputTokens": 250,
            "temperature": 0.7
        }
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            res = await client.post(url, json=payload)
            if res.status_code == 200:
                data = res.json()
                candidates = data.get("candidates", [])
                if candidates:
                    return candidates[0]["content"]["parts"][0]["text"].strip()
    except Exception as e:
        logger.error(f"Gemini request failed: {e}")
    return None

async def generate_ai_reply(user_msg: str, history: list = None) -> Optional[str]:
    """Try OpenAI first, then Gemini."""
    history = history or []
    
    # 1. Try OpenAI
    reply = await query_openai(user_msg, history)
    if reply:
        return reply

    # 2. Try Gemini
    reply = await query_gemini(user_msg)
    if reply:
        return reply

    return None
