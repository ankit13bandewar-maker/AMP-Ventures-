import re
from fastapi import APIRouter
from app.models import ChatbotRequest, ChatbotResponse
from app.services.llm import generate_ai_reply

router = APIRouter()

# Structured FAQ knowledge base for AMP Ventures (Instant & Zero Cost)
FAQS = [
    {
        "keywords": ["price", "cost", "pricing", "budget", "package", "how much", "rate", "fee", "tier", "kitna", "kitne", "daam", "kimat", "kharcha", "paise", "rupaye"],
        "reply": "AMP Ventures offers 3 distinct tiers tailored for offline businesses:\n• **Tier 1 (Basic)**: Starting at ₹9,999 (~$149) — 4-6 pages, mobile responsive, Google Map & basic SEO.\n• **Tier 2 (Premium)**: Starting at ₹24,999 (~$349) — Custom CMS, blog, analytics, reviews widget & retainer option.\n• **Tier 3 (Premium Plus)**: Starting at ₹49,999 (~$699) — 3D interactive hero, AI chatbot & WhatsApp Business API automation.\n\nWould you like a custom quote for your specific business?",
        "suggested_actions": ["View Pricing Breakdown", "Check Digital Readiness Score", "Talk on WhatsApp"],
        "recommended_tier": "Tier 2 — Premium"
    },
    {
        "keywords": ["tier 1", "basic", "static"],
        "reply": "Our **Tier 1 — Basic** package (₹9,999) is ideal for local shops, cafes, and clinics wanting a clean, fast online presence in 5-7 days. It includes:\n• 4–6 responsive pages\n• Google Business Profile link & Map sync\n• Contact form with instant email alerts\n• Free SSL & domain setup guidance\n• 1 revision round.",
        "suggested_actions": ["Get Tier 1 Quote", "Compare with Tier 2"],
        "recommended_tier": "Tier 1 — Basic"
    },
    {
        "keywords": ["tier 2", "premium", "cms", "retainer"],
        "reply": "Our **Tier 2 — Premium** package (₹24,999) is our Most Popular choice! You get:\n• Everything in Basic\n• Lightweight custom CMS (update menus, prices & photos yourself)\n• Google Analytics & SEO tracking\n• Google Reviews widget\n• Optional monthly maintenance retainer for peace of mind.",
        "suggested_actions": ["Get Tier 2 Quote", "See Tier 3 Features"],
        "recommended_tier": "Tier 2 — Premium"
    },
    {
        "keywords": ["tier 3", "plus", "3d", "automation", "whatsapp", "bot", "ai"],
        "reply": "Our **Tier 3 — Premium Plus** (₹49,999) is designed for businesses seeking massive market advantage:\n• 3D interactive hero section (Three.js/Spline)\n• Embedded AI FAQ & lead capture chatbot\n• WhatsApp Business API automated booking & inquiries\n• Centralized lead dashboard\n• Priority SLA support.",
        "suggested_actions": ["Request Tier 3 Demo", "Book Strategy Call"],
        "recommended_tier": "Tier 3 — Premium Plus"
    },
    {
        "keywords": ["timeline", "how long", "delivery", "duration", "fast", "days", "kitne din", "kab tak", "time kitna"],
        "reply": "Our delivery timelines:\n• **Tier 1**: 5–7 business days\n• **Tier 2**: 10–14 business days\n• **Tier 3**: 14–21 business days\n\nWe start with a quick discovery call and handle all copy and setup for you.",
        "suggested_actions": ["Book Discovery Call", "Start Contact Form"],
        "recommended_tier": None
    },
    {
        "keywords": ["founder", "credibility", "iit", "ccna", "who are you", "about"],
        "reply": "AMP Ventures is led by technical architects certified in **AI/ML from IIT Roorkee** and **Cisco CCNA Networking**. We focus 100% on bridging the digital gap for local offline businesses with enterprise-grade engineering.",
        "suggested_actions": ["Read Founder Story", "View Pricing"],
        "recommended_tier": None
    },
    {
        "keywords": ["salon", "spa", "clinic", "doctor", "restaurant", "cafe", "retail", "shop", "industry"],
        "reply": "We specialize in offline transformations:\n• **Salons/Spas**: Instant appointment booking & stylist portfolio\n• **Clinics/Doctors**: Patient inquiry flow & clinic location trust\n• **Restaurants/Cafes**: Live digital menu, QR codes & map directions\n• **Retail/Jewelry**: Showcase catalog & WhatsApp direct order inquiries.",
        "suggested_actions": ["Calculate Readiness Score", "Talk on WhatsApp"],
        "recommended_tier": None
    },
    {
        "keywords": ["hindi", "hindi me", "madad", "sahayata", "namaste", "kaise ho"],
        "reply": "नमस्ते! 🙏 जी हाँ, हम हिंदी (Hindi) और English दोनों में आपकी पूरी सहायता करते हैं। आप अपनी दुकान, सैलून, क्लिनिक या रेस्टोरेंट के लिए वेबसाइट बनवाने के बारे में कोई भी सवाल पूछ सकते हैं।",
        "suggested_actions": ["View Pricing Breakdown", "Talk on WhatsApp"],
        "recommended_tier": None
    }
]

@router.post("/chatbot", response_model=ChatbotResponse)
async def chat_with_bot(payload: ChatbotRequest):
    """
    Context-aware AI Chatbot endpoint for prospective clients.
    1. Checks fast keyword FAQ matches first.
    2. Falls back to OpenAI / Gemini LLM if API key is provided.
    3. Falls back to agency introduction guide.
    """
    user_msg = payload.message.lower().strip()
    
    # 1. Check keyword matches
    for faq in FAQS:
        if any(re.search(rf"\b{kw}\b", user_msg) for kw in faq["keywords"]):
            return ChatbotResponse(
                reply=faq["reply"],
                suggested_actions=faq["suggested_actions"],
                recommended_tier=faq.get("recommended_tier")
            )
            
    # 2. Try LLM API (OpenAI / Gemini)
    llm_reply = await generate_ai_reply(payload.message, payload.history)
    if llm_reply:
        return ChatbotResponse(
            reply=llm_reply,
            suggested_actions=["Book a Consultation", "Check Pricing", "Talk on WhatsApp"],
            recommended_tier="Tier 2 — Premium"
        )
            
    # 3. Default helpful fallback with quick guidance
    return ChatbotResponse(
        reply="Welcome to **AMP Ventures**! I can help you select the ideal web package for your salon, clinic, restaurant, or retail store. Are you looking to understand our 3 service tiers, check pricing, or see how we can build your site in 7 days?",
        suggested_actions=["Tell me about Tier 2 (Most Popular)", "How much does it cost?", "Book a Free Consultation"],
        recommended_tier="Tier 2 — Premium"
    )
