from fastapi import APIRouter
from typing import List, Optional
from app.services.cache import cached

router = APIRouter()

PORTFOLIO_CASE_STUDIES = [
    {
        "id": "salon-luxe-glow",
        "title": "Luxe Glow Unisex Salon & Spa",
        "industry": "Salon & Spa",
        "category": "salon",
        "tier": "Tier 2 — Premium",
        "tagline": "From walk-ins only to 120+ weekly online bookings",
        "client_location": "Bengaluru, India",
        "metrics": {
            "booking_increase": "+145%",
            "google_reviews": "4.9 ★ (210+)",
            "page_load_speed": "0.6s"
        },
        "description": "Built a high-converting salon portal with stylist portfolios, service price cards, and seamless WhatsApp booking. Replaced manual phone appointments with automated Google Calendar syncing.",
        "deliverables": [
            "Responsive 6-page Web App",
            "Custom Stylist & Service CMS",
            "Google Maps 360 & Reviews Widget",
            "Direct WhatsApp Slot Booking"
        ],
        "image_gradient": "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
        "live_demo_url": "#demo-salon"
    },
    {
        "id": "restaurant-saffron-bistro",
        "title": "Saffron Hearth Fine Dine & Cafe",
        "industry": "Restaurant & Cafe",
        "category": "restaurant",
        "tier": "Tier 3 — Premium Plus",
        "tagline": "3D Interactive Menu & Instant Table Reservations",
        "client_location": "New Delhi, India",
        "metrics": {
            "table_bookings": "+210%",
            "menu_scans": "4,500+/mo",
            "zero_no_shows": "92% retention"
        },
        "description": "Crafted an immersive 3D culinary showcase with interactive rotating dishes, dynamic QR digital menu for diners, and WhatsApp Business API table confirmation automation.",
        "deliverables": [
            "3D Dish Showcase (WebGL/Spline)",
            "Dynamic Menu Management CMS",
            "WhatsApp Automated Table Booking",
            "SEO Rank #1 for 'Best Fine Dine South Delhi'"
        ],
        "image_gradient": "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
        "live_demo_url": "#demo-restaurant"
    },
    {
        "id": "clinic-careplus-dental",
        "title": "CarePlus Multi-Specialty Dental Clinic",
        "industry": "Clinic & Healthcare",
        "category": "clinic",
        "tier": "Tier 2 — Premium",
        "tagline": "Building patient trust with verified doctor profiles & fast consultations",
        "client_location": "Hyderabad, India",
        "metrics": {
            "new_patients": "+85%/mo",
            "organic_search": "Top 3 on Maps",
            "inquiry_response_time": "< 5 mins"
        },
        "description": "Developed an accessible, HIPAA/tele-compliant dental practice website with transparent treatment costs, smile makeover gallery, doctor credentials, and 1-click WhatsApp emergency consultation.",
        "deliverables": [
            "Accessible Clinic Portal",
            "Doctor Credentials & Case Gallery",
            "Google Map Local SEO Optimization",
            "WhatsApp Patient Inquiry Pipeline"
        ],
        "image_gradient": "linear-gradient(135deg, #10B981 0%, #06B6D4 100%)",
        "live_demo_url": "#demo-clinic"
    },
    {
        "id": "retail-heritage-jewels",
        "title": "Heritage Gems & Handcrafted Silvers",
        "industry": "Retail & Boutique",
        "category": "retail",
        "tier": "Tier 1 — Basic",
        "tagline": "Offline jewelry boutique established 1988 launches digital catalog",
        "client_location": "Jaipur, India",
        "metrics": {
            "store_foot_traffic": "+60%",
            "outstation_inquiries": "40+ weekly",
            "launch_timeline": "5 Days"
        },
        "description": "Launched a fast static catalog website showcasing signature bridal jewelry collections with direct store directions, showroom video tour, and WhatsApp product inquiry triggers.",
        "deliverables": [
            "5-Page High-Speed Static Website",
            "High-Resolution Jewelry Gallery",
            "Google Business Profile Linkage",
            "1-Click 'Inquire on WhatsApp' per product"
        ],
        "image_gradient": "linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)",
        "live_demo_url": "#demo-retail"
    }
]

@router.get("/portfolio")
@cached(ttl_seconds=600, key_prefix="portfolio")
async def get_portfolio(category: Optional[str] = None):
    """Retrieve agency portfolio case studies with optional industry filter."""
    if category and category.lower() != "all":
        filtered = [item for item in PORTFOLIO_CASE_STUDIES if item["category"].lower() == category.lower()]
        return {"count": len(filtered), "case_studies": filtered}
    return {"count": len(PORTFOLIO_CASE_STUDIES), "case_studies": PORTFOLIO_CASE_STUDIES}
