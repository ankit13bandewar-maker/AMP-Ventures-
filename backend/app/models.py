from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional

# Contact / Lead Models
class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, example="Rajesh Sharma")
    business_name: str = Field(..., min_length=2, max_length=150, example="Sharma Sweets & Cafe")
    email: str = Field(..., example="rajesh@sharmasweets.com")
    phone: str = Field(..., min_length=7, max_length=20, example="+91 98765 43210")
    tier: str = Field(default="Tier 1 - Basic (Static Website)", example="Tier 2 - Premium")
    budget: Optional[str] = Field(default="Standard", example="₹15,000 - ₹30,000")
    message: Optional[str] = Field(default="", example="We want a website with online ordering and Google map sync.")
    hp_field: Optional[str] = Field(default="", description="Honeypot field for anti-spam")

class ContactResponse(BaseModel):
    success: bool
    message: str
    lead_id: int
    data: dict

class LeadStatusUpdateRequest(BaseModel):
    status: str = Field(..., example="Contacted")

# Readiness Score Tool Models
class ReadinessRequest(BaseModel):
    business_name: str = Field(..., min_length=2, example="Luxe Glow Salon")
    city: str = Field(..., min_length=2, example="Bengaluru")
    industry: str = Field(default="Salon / Spa", example="Salon / Spa")
    has_website: bool = Field(default=False)
    has_google_maps: Optional[bool] = Field(default=False)
    has_social: Optional[bool] = Field(default=False)
    accepts_online_booking: Optional[bool] = Field(default=False)
    email: Optional[str] = None
    phone: Optional[str] = None

class ChecklistItem(BaseModel):
    item: str
    status: str  # "missing", "recommended", "optimal"
    impact: str  # "High", "Critical", "Medium"
    description: str

class ReadinessResponse(BaseModel):
    score: int
    level: str
    summary: str
    potential_revenue_boost: str
    checklist: List[ChecklistItem]
    recommended_tier: str
    recommended_tier_reason: str

# Chatbot Models
class ChatMessage(BaseModel):
    role: str = Field(..., example="user")
    content: str = Field(..., example="What is included in Tier 2?")

class ChatbotRequest(BaseModel):
    message: str = Field(..., min_length=1, example="Tell me about pricing for clinics")
    history: Optional[List[ChatMessage]] = Field(default=[])

class ChatbotResponse(BaseModel):
    reply: str
    suggested_actions: Optional[List[str]] = None
    recommended_tier: Optional[str] = None
