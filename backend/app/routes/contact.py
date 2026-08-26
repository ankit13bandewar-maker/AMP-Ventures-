import csv
import io
from fastapi import APIRouter, HTTPException, Query, Request, Depends, status
from fastapi.responses import StreamingResponse
from app.models import ContactRequest, ContactResponse, LeadStatusUpdateRequest
from app.db import insert_lead, get_all_leads, update_lead_status, delete_lead
from app.auth import verify_admin_key
from app.services.rate_limiter import limiter
from app.services.notifier import notify_new_lead
from app.services.worker import worker
from app.logger import logger

router = APIRouter()

@router.post("/contact", response_model=ContactResponse)
async def submit_contact(payload: ContactRequest, request: Request):
    """
    Handle contact form submissions from prospective offline clients.
    Includes rate limiting, anti-spam honeypot detection, SQLite persistence,
    and reliable background notification dispatch with exponential retries.
    """
    # 1. IP Rate Limiting
    limiter.check(request)

    # 2. Anti-spam honeypot check (if bot filled hidden field)
    if payload.hp_field and payload.hp_field.strip():
        logger.warning(f"[SPAM TRAP] Bot detected with honeypot value: {payload.hp_field}")
        # Silently return success to confuse the bot without persisting spam
        return ContactResponse(
            success=True,
            message="Thank you! We will reach out shortly.",
            lead_id=0,
            data={}
        )

    try:
        # 3. Persist lead to database
        lead_data = insert_lead(
            name=payload.name.strip(),
            business_name=payload.business_name.strip(),
            email=payload.email.strip(),
            phone=payload.phone.strip(),
            tier=payload.tier,
            budget=payload.budget or "Standard",
            message=payload.message or ""
        )
        
        # 4. Trigger resilient background task with retries
        worker.enqueue(
            notify_new_lead,
            lead_data,
            retries=3,
            delay_seconds=2.0,
            task_name=f"lead_notification_{lead_data['id']}"
        )
        
        return ContactResponse(
            success=True,
            message=f"Thank you, {payload.name}! We've received your request for {payload.business_name}. Our Lead Technical Architect will reach out within 4 business hours.",
            lead_id=lead_data["id"],
            data=lead_data
        )
    except Exception as e:
        logger.error(f"Error saving lead: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save inquiry. Please contact directly via WhatsApp."
        )

@router.get("/leads", dependencies=[Depends(verify_admin_key)])
async def list_leads(limit: int = Query(100, ge=1, le=500)):
    """
    Secure Admin endpoint to view captured leads. Requires Bearer JWT or X-Admin-Key.
    """
    leads = get_all_leads(limit=limit)
    return {
        "total": len(leads),
        "leads": leads
    }

@router.get("/leads/export.csv", dependencies=[Depends(verify_admin_key)])
async def export_leads_csv():
    """
    1-Click CSV Export endpoint. Generates a downloadable spreadsheet file for Excel/Google Sheets.
    """
    leads = get_all_leads(limit=500)
    
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Write CSV Header
    writer.writerow(["ID", "Name", "Business Name", "Email", "Phone", "Tier", "Budget", "Status", "Created At (UTC)", "Message"])
    
    # Write Rows
    for lead in leads:
        writer.writerow([
            lead.get("id"),
            lead.get("name"),
            lead.get("business_name"),
            lead.get("email"),
            lead.get("phone"),
            lead.get("tier"),
            lead.get("budget"),
            lead.get("status"),
            lead.get("created_at"),
            lead.get("message")
        ])
    
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=amp_ventures_leads.csv"}
    )

@router.patch("/leads/{lead_id}/status", dependencies=[Depends(verify_admin_key)])
async def update_lead_status_endpoint(lead_id: int, payload: LeadStatusUpdateRequest):
    """
    Update lead pipeline status (e.g., 'New', 'Contacted', 'Proposal Sent', 'Closed', 'Archived').
    """
    success = update_lead_status(lead_id, payload.status)
    if not success:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"success": True, "lead_id": lead_id, "new_status": payload.status}

@router.delete("/leads/{lead_id}", dependencies=[Depends(verify_admin_key)])
async def delete_lead_endpoint(lead_id: int):
    """
    Delete a lead from database.
    """
    success = delete_lead(lead_id)
    if not success:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"success": True, "lead_id": lead_id}
