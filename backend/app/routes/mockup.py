from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import List, Optional

router = APIRouter()

class MockupRequest(BaseModel):
    business_name: str = Field(..., min_length=2, example="Luxe Glow Salon")
    city: str = Field(default="Mumbai", example="Mumbai")
    industry: str = Field(default="salon", example="salon")
    theme_color: Optional[str] = Field(default="#6366F1")

class ServiceItem(BaseModel):
    title: str
    price: str
    desc: str
    badge: Optional[str] = None
    image_url: Optional[str] = None

class ReviewItem(BaseModel):
    author: str
    rating: int
    text: str
    time_ago: str
    avatar: Optional[str] = None

class MockupResponse(BaseModel):
    business_name: str
    city: str
    industry: str
    tagline: str
    hero_headline: str
    hero_subheadline: str
    hero_image: str
    accent_color: str
    services: List[ServiceItem]
    reviews: List[ReviewItem]
    cta_text: str
    booking_phone: str
    rating: float = 4.9
    review_count: str = "450+ Verified Reviews"
    address: str = "Prime High Street, City Center"

INDUSTRY_TEMPLATES = {
    "salon": {
        "tagline": "Luxury Unisex Salon & Wellness Spa",
        "headline_fmt": "Elevate Your Style & Radiance at {name}",
        "subheadline_fmt": "Master stylist haircuts, bespoke bridal makeovers, and rejuvenating therapeutic spas crafted for you in {city}.",
        "hero_image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
        "cta_text": "Book Slot on WhatsApp",
        "services": [
            {
                "title": "Signature Hair Styling & Spa",
                "price": "₹1,499",
                "desc": "Customized cut, keratin wash & blowout with senior stylist",
                "badge": "Popular",
                "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
            },
            {
                "title": "Organic Glow Skin Facial",
                "price": "₹2,199",
                "desc": "Deep ultrasonic pore cleansing with 24K gold serum",
                "badge": "Trending",
                "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
            },
            {
                "title": "Bridal & HD Glam Makeover",
                "price": "₹4,999",
                "desc": "Complete airbrush session with hair setup & draping",
                "badge": "VIP",
                "image_url": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
            }
        ],
        "reviews": [
            {"author": "Ananya Sharma", "rating": 5, "text": "Booked my haircut online in 20 seconds. Zero wait time and exceptional service!", "time_ago": "2 days ago", "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"},
            {"author": "Rohan Kapoor", "rating": 5, "text": "The cleanest salon atmosphere with top master stylists. Highly recommend their slot booking.", "time_ago": "1 week ago", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"}
        ]
    },
    "restaurant": {
        "tagline": "Artisanal Woodfired Kitchen & Craft Cafe",
        "headline_fmt": "Savor Extraordinary Gourmet Dining at {name}",
        "subheadline_fmt": "Farm-to-fork ingredients, authentic woodfired recipes, and unforgettable handcrafted cocktails in {city}.",
        "hero_image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
        "cta_text": "Reserve Table Online",
        "services": [
            {
                "title": "Chef's Signature Truffle Platter",
                "price": "₹899",
                "desc": "Truffle butter infused specialties with fresh sourdough",
                "badge": "Chef Special",
                "image_url": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
            },
            {
                "title": "Neapolitan Wood-Fired Pizza",
                "price": "₹649",
                "desc": "Slow-fermented crust with San Marzano tomatoes & burrata",
                "badge": "Bestseller",
                "image_url": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
            },
            {
                "title": "Artisanal Mocktail & Dessert Pair",
                "price": "₹499",
                "desc": "Smoked botanical fizz paired with warm Belgian lava cake",
                "badge": "Must Try",
                "image_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
            }
        ],
        "reviews": [
            {"author": "Vikram Sethi", "rating": 5, "text": "Instant online reservation booked us prime window seats. Food was phenomenal!", "time_ago": "Yesterday", "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"},
            {"author": "Priya Menon", "rating": 5, "text": "Loved the QR digital menu and fast table service. Perfect ambience for date nights.", "time_ago": "3 days ago", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
        ]
    },
    "clinic": {
        "tagline": "Advanced Multispecialty Clinic & Care",
        "headline_fmt": "Exceptional Patient Care & Diagnostics at {name}",
        "subheadline_fmt": "Senior board-certified physicians, zero-queue digital appointments, and same-day lab reports in {city}.",
        "hero_image": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80",
        "cta_text": "Book Doctor Consultation",
        "services": [
            {
                "title": "Comprehensive Full Body Screening",
                "price": "₹1,999",
                "desc": "65+ vital parameters, doctor review & digital report within 4 hours",
                "badge": "Essential",
                "image_url": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
            },
            {
                "title": "Senior Specialist Consultation",
                "price": "₹799",
                "desc": "One-on-one clinical assessment with department head",
                "badge": "Verified",
                "image_url": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80"
            },
            {
                "title": "Rapid Diagnostics & Preventive Care",
                "price": "₹1,299",
                "desc": "ECG, blood panel & automated WhatsApp prescription delivery",
                "badge": "Fast",
                "image_url": "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=600&q=80"
            }
        ],
        "reviews": [
            {"author": "Dr. Sunil Gupta", "rating": 5, "text": "Very organized clinic. WhatsApp appointment updates made our visit completely seamless.", "time_ago": "4 days ago", "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80"},
            {"author": "Meera Trivedi", "rating": 5, "text": "No waiting room congestion! The doctors are attentive and highly professional.", "time_ago": "2 weeks ago", "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"}
        ]
    },
    "retail": {
        "tagline": "Curated Designer Apparel & Boutique Studio",
        "headline_fmt": "Discover Signature Handcrafted Fashion at {name}",
        "subheadline_fmt": "Exclusive artisanal collections, bespoke tailor fittings, and express same-day doorstep deliveries in {city}.",
        "hero_image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80",
        "cta_text": "Shop on WhatsApp",
        "services": [
            {
                "title": "Handcrafted Silk & Festive Wear",
                "price": "₹2,499",
                "desc": "Artisan woven pure textiles with modern silhouette cuts",
                "badge": "New Arrival",
                "image_url": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80"
            },
            {
                "title": "925 Silver Fine Statement Jewelry",
                "price": "₹1,899",
                "desc": "Hallmarked jewelry with natural semi-precious gemstones",
                "badge": "Trending",
                "image_url": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80"
            },
            {
                "title": "Custom Bespoke Master Tailoring",
                "price": "₹999",
                "desc": "Personalized 3D fitting session with senior fashion stylist",
                "badge": "Custom",
                "image_url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"
            }
        ],
        "reviews": [
            {"author": "Sneha Patil", "rating": 5, "text": "Ordered straight from their digital catalog with instant WhatsApp confirmation. Love it!", "time_ago": "3 days ago", "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"},
            {"author": "Aditya Varma", "rating": 5, "text": "Top notch quality, beautiful digital store showcase, and lightning quick support.", "time_ago": "5 days ago", "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80"}
        ]
    }
}

@router.post("/generate-mockup", response_model=MockupResponse)
async def generate_mockup(payload: MockupRequest):
    """
    Generate instant tailored website preview data for offline business owners.
    """
    bname = payload.business_name.strip() or "Your Business Name"
    city = payload.city.strip() or "Your City"
    ind_key = payload.industry.lower() if payload.industry.lower() in INDUSTRY_TEMPLATES else "salon"
    
    template = INDUSTRY_TEMPLATES[ind_key]
    
    return MockupResponse(
        business_name=bname,
        city=city,
        industry=payload.industry.capitalize(),
        tagline=template["tagline"],
        hero_headline=template["headline_fmt"].format(name=bname, city=city),
        hero_subheadline=template["subheadline_fmt"].format(name=bname, city=city),
        hero_image=template["hero_image"],
        accent_color=payload.theme_color or "#6366F1",
        services=[ServiceItem(**s) for s in template["services"]],
        reviews=[ReviewItem(**r) for r in template["reviews"]],
        cta_text=template["cta_text"],
        booking_phone="+91 98765 43210",
        rating=4.9,
        review_count="450+ Verified Reviews",
        address=f"100ft Road, High Street, {city}"
    )
