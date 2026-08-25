from fastapi import APIRouter, HTTPException, Query, Header
from app.models import ContactRequest, ContactResponse
from app.db import insert_lead, get_all_leads
from app.config import settings
import logging

router = APIRouter()
logger = logging.getLogger("amp_ventures")

def simulate_email_dispatch(lead: dict):
    """Simulate instant email notification to AMP Ventures team and client confirmation."""
    logger.info(f"[EMAIL NOTIFICATION] New Lead Received: {lead['name']} ({lead['business_name']}) - Tier: {lead['tier']}")
    logger.info(f"[EMAIL NOTIFICATION] Client Email: {lead['email']}, Phone: {lead['phone']}")
    # Real SMTP/Sendgrid integration hook ready

@router.post("/contact", response_model=ContactResponse)
async def submit_contact(payload: ContactRequest):
    """
    Handle contact form submissions from prospective offline clients.
    Persists lead to SQLite database and triggers mock email dispatch.
    """
    try:
        lead_data = insert_lead(
            name=payload.name.strip(),
            business_name=payload.business_name.strip(),
            email=payload.email.strip(),
            phone=payload.phone.strip(),
            tier=payload.tier,
            budget=payload.budget or "Standard",
            message=payload.message or ""
        )
        
        # Simulate dispatching email notification
        simulate_email_dispatch(lead_data)
        
        return ContactResponse(
            success=True,
            message=f"Thank you, {payload.name}! We've received your request for {payload.business_name}. Our technical architect will reach out within 4 hours.",
            lead_id=lead_data["id"],
            data=lead_data
        )
    except Exception as e:
        logger.error(f"Error saving lead: {e}")
        raise HTTPException(status_code=500, detail="Failed to save inquiry. Please try WhatsApp direct.")

@router.get("/leads")
async def list_leads(limit: int = Query(50, ge=1, le=200)):
    """
    Admin endpoint to view captured leads.
    """
    leads = get_all_leads(limit=limit)
    return {
        "total": len(leads),
        "leads": leads
    }
