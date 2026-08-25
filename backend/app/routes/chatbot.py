from fastapi import APIRouter
from app.models import ChatbotRequest, ChatbotResponse
import re

router = APIRouter()

# Structured FAQ knowledge base for AMP Ventures
FAQS = [
    {
        "keywords": ["price", "cost", "pricing", "budget", "package", "how much", "rate"],
        "reply": "AMP Ventures offers 3 distinct tiers tailored for offline businesses:\n• **Tier 1 (Basic)**: Starting at ₹9,999 (~$149) — 4-6 pages, mobile responsive, Google Map & basic SEO.\n• **Tier 2 (Premium)**: Starting at ₹24,999 (~$349) — Custom CMS, blog, analytics, reviews widget & retainer option.\n• **Tier 3 (Premium Plus)**: Starting at ₹49,999 (~$699) — 3D interactive hero, AI chatbot & WhatsApp Business API automation.\n\nWould you like a custom quote for your specific business?",
        "suggested_actions": ["View Pricing Breakdown", "Check Digital Readiness Score", "Talk on WhatsApp"],
        "recommended_tier": "Tier 2 — Premium"
    },
    {
        "keywords": ["tier 1", "basic", "static"],
        "reply": "Our **Tier 1 — Basic** package is ideal for local shops, cafes, and clinics wanting a clean, fast online presence in 5-7 days. It includes:\n• 4–6 responsive pages\n• Google Business Profile link & Map sync\n• Contact form with instant email alerts\n• Free SSL & domain setup guidance\n• 1 revision round.",
        "suggested_actions": ["Get Tier 1 Quote", "Compare with Tier 2"],
        "recommended_tier": "Tier 1 — Basic"
    },
    {
        "keywords": ["tier 2", "premium", "cms", "retainer"],
        "reply": "Our **Tier 2 — Premium** package is our Most Popular choice! You get:\n• Everything in Basic\n• Lightweight custom CMS (update menus, prices & photos yourself)\n• Google Analytics & SEO tracking\n• Google Reviews widget\n• Optional monthly maintenance retainer for peace of mind.",
        "suggested_actions": ["Get Tier 2 Quote", "See Tier 3 Features"],
        "recommended_tier": "Tier 2 — Premium"
    },
    {
        "keywords": ["tier 3", "plus", "3d", "automation", "whatsapp", "bot", "ai"],
        "reply": "Our **Tier 3 — Premium Plus** is designed for businesses seeking massive market advantage:\n• 3D interactive hero section (Three.js/Spline)\n• Embedded AI FAQ & lead capture chatbot\n• WhatsApp Business API automated booking & inquiries\n• Centralized lead dashboard\n• Priority SLA support.",
        "suggested_actions": ["Request Tier 3 Demo", "Book Strategy Call"],
        "recommended_tier": "Tier 3 — Premium Plus"
    },
    {
        "keywords": ["timeline", "how long", "delivery", "duration", "fast"],
        "reply": "Our delivery timelines:\n• **Tier 1**: 5–7 business days\n• **Tier 2**: 10–14 business days\n• **Tier 3**: 14–21 business days\n\nWe start with a quick 30-minute discovery call and handle all copy and setup for you.",
        "suggested_actions": ["Book Discovery Call", "Start Contact Form"],
        "recommended_tier": None
    },
    {
        "keywords": ["founder", "credibility", "iit", "ccna", "who are you", "about"],
        "reply": "AMP Ventures is led by technical architects certified in **AI/ML from IIT Roorkee** and **Cisco CCNA Networking**. We focus 100% on bridging the digital gap for local offline businesses with enterprise-grade engineering.",
        "suggested_actions": ["Read Founder Story", "View Portfolio"],
        "recommended_tier": None
    },
    {
        "keywords": ["salon", "spa", "clinic", "doctor", "restaurant", "cafe", "retail", "shop", "industry"],
        "reply": "We specialize in offline transformations:\n• **Salons/Spas**: Instant appointment booking & stylist portfolio\n• **Clinics/Doctors**: Patient inquiry flow & clinic location trust\n• **Restaurants/Cafes**: Live digital menu, QR codes & map directions\n• **Retail/Jewelry**: Showcase catalog & WhatsApp direct order inquiries.",
        "suggested_actions": ["Explore Industry Portfolio", "Calculate Readiness Score"],
        "recommended_tier": None
    }
]

@router.post("/chatbot", response_model=ChatbotResponse)
async def chat_with_bot(payload: ChatbotRequest):
    """
    Context-aware AI Chatbot endpoint for prospective clients.
    Matches queries to agency knowledge base with instant conversational answers.
    """
    user_msg = payload.message.lower().strip()
    
    # Check for keyword matches
    for faq in FAQS:
        if any(re.search(rf"\b{kw}\b", user_msg) for kw in faq["keywords"]):
            return ChatbotResponse(
                reply=faq["reply"],
                suggested_actions=faq["suggested_actions"],
                recommended_tier=faq.get("recommended_tier")
            )
            
    # Default helpful fallback with quick guidance
    return ChatbotResponse(
        reply="Welcome to **AMP Ventures**! I can help you select the ideal web package for your salon, clinic, restaurant, or retail store. Are you looking to understand our 3 service tiers, check pricing, or see how we can build your site in 7 days?",
        suggested_actions=["Tell me about Tier 2 (Most Popular)", "How much does it cost?", "Book a Free Consultation"],
        recommended_tier="Tier 2 — Premium"
    )
