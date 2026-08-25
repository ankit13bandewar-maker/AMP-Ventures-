from fastapi import APIRouter
from app.models import ReadinessRequest, ReadinessResponse, ChecklistItem
from app.db import insert_readiness_check, get_all_readiness_checks
from typing import List

router = APIRouter()

@router.post("/readiness-score", response_model=ReadinessResponse)
async def calculate_readiness_score(payload: ReadinessRequest):
    """
    Computes a tailored digital readiness maturity score (0-100)
    for offline businesses and returns an actionable missing-presence checklist.
    """
    score = 15  # Base score for existing registered business
    checklist: List[ChecklistItem] = []
    
    # 1. Website Analysis
    if payload.has_website:
        score += 30
        checklist.append(ChecklistItem(
            item="Existing Website Online",
            status="optimal",
            impact="High",
            description="Your business already has a web domain, but modern mobile speed and conversion optimization can yield 3x higher leads."
        ))
    else:
        checklist.append(ChecklistItem(
            item="Professional Web Presence",
            status="missing",
            impact="Critical",
            description="Over 78% of local customers search online before visiting a shop or clinic. Without a site, you lose customers to competitors."
        ))
        
    # 2. Google Business Profile & Maps
    if payload.has_google_maps:
        score += 25
        checklist.append(ChecklistItem(
            item="Google Maps & Local Search Listing",
            status="optimal",
            impact="High",
            description="Local search listing active. Syncing reviews and direct website booking links will boost foot traffic."
        ))
    else:
        checklist.append(ChecklistItem(
            item="Google Business Profile & 5-Star Reviews Hub",
            status="missing",
            impact="Critical",
            description="You are missing top ranking on 'near me' local map searches in your city."
        ))
        
    # 3. Social & Direct Inquiries
    if payload.has_social:
        score += 15
        checklist.append(ChecklistItem(
            item="Social Media Channels (Instagram / Facebook)",
            status="optimal",
            impact="Medium",
            description="Social presence detected. Direct WhatsApp automation links on bio will turn viewers into paying visitors."
        ))
    else:
        checklist.append(ChecklistItem(
            item="Digital Showcase & Social Proof",
            status="recommended",
            impact="Medium",
            description="No direct visual portfolio detected. High-resolution gallery and client testimonials are recommended."
        ))
        
    # 4. Online Booking / Automated Inquiries
    if payload.accepts_online_booking:
        score += 15
        checklist.append(ChecklistItem(
            item="Direct Booking / Inquiry System",
            status="optimal",
            impact="High",
            description="Online inquiry flow active. Upgrading to WhatsApp API auto-confirmation reduces no-shows by 45%."
        ))
    else:
        checklist.append(ChecklistItem(
            item="24/7 Automated WhatsApp & Booking Flow",
            status="missing",
            impact="High",
            description="Customers cannot book appointments or request pricing after store hours, leading to dropped sales."
        ))

    # Cap score
    score = min(100, max(10, score))
    
    # Tier recommendations based on score & industry
    if score <= 35:
        level = "Offline Only (High Opportunity)"
        summary = f"{payload.business_name} in {payload.city} is operating primarily offline. Launching a high-converting digital storefront will unlock immediate local demand."
        potential_revenue_boost = "+40% to +80% New Customer Acquisition"
        recommended_tier = "Tier 1 — Basic (Static Website)"
        recommended_tier_reason = "Best starting point: Fast 5-day setup, mobile-responsive layout, Google Maps integration, and direct customer inquiry form."
    elif score <= 65:
        level = "Emerging Digital (Moderate)"
        summary = f"{payload.business_name} has baseline channels, but lacks automated conversion flows, catalog management, and local search dominance."
        potential_revenue_boost = "+25% to +50% Monthly Recurring Bookings"
        recommended_tier = "Tier 2 — Premium (CMS + Analytics + Retainer)"
        recommended_tier_reason = "Includes custom CMS to update menus/services, Google Analytics tracking, reviews integration, and monthly maintenance."
    else:
        level = "Digitally Active (Ready for Scaling)"
        summary = f"{payload.business_name} has an established presence. The key to market dominance is AI automation, 3D interactive design, and WhatsApp API CRM."
        potential_revenue_boost = "2.5x Higher Conversion & Zero Dropped Leads"
        recommended_tier = "Tier 3 — Premium Plus (3D + Automation)"
        recommended_tier_reason = "3D hero visual experience, AI FAQ chatbot widget, WhatsApp Business API auto-booking, and multi-channel lead dashboard."

    # Persist to DB
    insert_readiness_check(
        business_name=payload.business_name,
        city=payload.city,
        industry=payload.industry,
        has_website=payload.has_website,
        has_google_maps=bool(payload.has_google_maps),
        has_social=bool(payload.has_social),
        accepts_online_booking=bool(payload.accepts_online_booking),
        score=score,
        checklist=[item.model_dump() for item in checklist],
        email=payload.email,
        phone=payload.phone
    )

    return ReadinessResponse(
        score=score,
        level=level,
        summary=summary,
        potential_revenue_boost=potential_revenue_boost,
        checklist=checklist,
        recommended_tier=recommended_tier,
        recommended_tier_reason=recommended_tier_reason
    )

@router.get("/readiness-checks")
async def list_readiness_checks():
    """Admin endpoint to inspect digital readiness tool submissions."""
    checks = get_all_readiness_checks(limit=50)
    return {
        "total": len(checks),
        "checks": checks
    }
