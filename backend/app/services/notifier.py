import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import httpx
import logging
from app.config import settings

logger = logging.getLogger("amp_ventures")

async def send_smtp_email(to_email: str, subject: str, body_html: str, body_text: str = None) -> bool:
    """Send an HTML/text email using configured SMTP credentials."""
    if not settings.SMTP_PASSWORD:
        logger.info(f"[EMAIL NOT CONFIGURED] Skipping SMTP dispatch to {to_email}. (Add SMTP_PASSWORD in .env to enable).")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = settings.SMTP_USER
        msg["To"] = to_email

        if body_text:
            msg.attach(MIMEText(body_text, "plain"))
        msg.attach(MIMEText(body_html, "html"))

        # Connect to SMTP server
        server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10)
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.sendmail(settings.SMTP_USER, to_email, msg.as_string())
        server.quit()
        logger.info(f"[EMAIL SUCCESS] Sent notification email to {to_email}")
        return True
    except Exception as e:
        logger.error(f"[EMAIL ERROR] Failed to send email to {to_email}: {e}")
        return False

async def send_discord_webhook(lead: dict):
    """Send an instant rich embed alert to a Discord channel."""
    if not settings.DISCORD_WEBHOOK_URL:
        return

    payload = {
        "username": "AMP Ventures Lead Bot",
        "avatar_url": "https://raw.githubusercontent.com/ankit13bandewar-maker/AMP-Ventures-/main/favicon.ico",
        "embeds": [
            {
                "title": "🚨 New Client Lead Inquiry!",
                "color": 3878140, # Blue hex #3B82FC
                "fields": [
                    {"name": "👤 Name", "value": lead.get("name", "N/A"), "inline": True},
                    {"name": "🏢 Business", "value": lead.get("business_name", "N/A"), "inline": True},
                    {"name": "📦 Selected Tier", "value": lead.get("tier", "N/A"), "inline": True},
                    {"name": "📱 Phone", "value": lead.get("phone", "N/A"), "inline": True},
                    {"name": "✉️ Email", "value": lead.get("email", "N/A"), "inline": True},
                    {"name": "💰 Budget", "value": lead.get("budget", "N/A"), "inline": True},
                    {"name": "💬 Message", "value": lead.get("message", "No message provided.") or "No message", "inline": False}
                ],
                "footer": {"text": "AMP Ventures Real-Time Lead Engine"}
            }
        ]
    }

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            await client.post(settings.DISCORD_WEBHOOK_URL, json=payload)
            logger.info("[DISCORD NOTIFICATION] Dispatched lead alert.")
    except Exception as e:
        logger.error(f"[DISCORD ERROR] Failed to dispatch webhook: {e}")

async def send_telegram_alert(lead: dict):
    """Send an instant push message to Telegram chat/channel."""
    if not settings.TELEGRAM_BOT_TOKEN or not settings.TELEGRAM_CHAT_ID:
        return

    text = (
        f"🚨 *NEW CLIENT LEAD INQUIRY*\n\n"
        f"👤 *Name:* {lead.get('name')}\n"
        f"🏢 *Business:* {lead.get('business_name')}\n"
        f"📦 *Tier:* {lead.get('tier')}\n"
        f"📱 *Phone:* {lead.get('phone')}\n"
        f"✉️ *Email:* {lead.get('email')}\n"
        f"💰 *Budget:* {lead.get('budget')}\n"
        f"💬 *Message:* {lead.get('message') or 'N/A'}\n"
    )

    url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": settings.TELEGRAM_CHAT_ID,
        "text": text,
        "parse_mode": "Markdown"
    }

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            await client.post(url, json=payload)
            logger.info("[TELEGRAM NOTIFICATION] Dispatched telegram alert.")
    except Exception as e:
        logger.error(f"[TELEGRAM ERROR] Failed to dispatch alert: {e}")

async def notify_new_lead(lead: dict):
    """Orchestrate all notification channels for a newly received lead."""
    logger.info(f"[*] Dispatching notifications for new lead: {lead['name']} ({lead['business_name']})")

    # 1. Admin Email Alert
    admin_subject = f"🔥 New Lead: {lead['name']} - {lead['business_name']} ({lead['tier']})"
    admin_html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background: #0f172a; color: #f8fafc;">
        <h2 style="color: #38bdf8; margin-top: 0;">⚡ New Client Lead Inquiry Received</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; color: #f8fafc;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #334155; font-weight: bold; width: 35%;">Client Name:</td><td style="padding: 8px 0; border-bottom: 1px solid #334155;">{lead['name']}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #334155; font-weight: bold;">Business:</td><td style="padding: 8px 0; border-bottom: 1px solid #334155;">{lead['business_name']}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #334155; font-weight: bold;">Phone:</td><td style="padding: 8px 0; border-bottom: 1px solid #334155;"><a href="tel:{lead['phone']}" style="color: #4ade80;">{lead['phone']}</a></td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #334155; font-weight: bold;">Email:</td><td style="padding: 8px 0; border-bottom: 1px solid #334155;"><a href="mailto:{lead['email']}" style="color: #38bdf8;">{lead['email']}</a></td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #334155; font-weight: bold;">Requested Tier:</td><td style="padding: 8px 0; border-bottom: 1px solid #334155;">{lead['tier']}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #334155; font-weight: bold;">Budget:</td><td style="padding: 8px 0; border-bottom: 1px solid #334155;">{lead['budget']}</td></tr>
        </table>
        <div style="background: #1e293b; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <p style="margin: 0; font-weight: bold; color: #94a3b8; font-size: 13px;">CLIENT MESSAGE:</p>
            <p style="margin: 5px 0 0 0; font-size: 15px; color: #ffffff;">{lead.get('message') or 'No custom message.'}</p>
        </div>
        <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">AMP Ventures Real-Time Lead Engine</p>
    </div>
    """
    await send_smtp_email(settings.NOTIFICATION_EMAIL_TO, admin_subject, admin_html)

    # 2. Client Auto-Confirmation Email
    if lead.get("email") and "@" in lead["email"]:
        client_subject = f"We received your project inquiry — AMP Ventures"
        client_html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #2563eb; margin-top: 0;">Hi {lead['name']},</h2>
            <p style="font-size: 16px; line-height: 1.5; color: #334155;">
                Thank you for contacting <strong>AMP Ventures</strong> regarding <strong>{lead['business_name']}</strong>!
            </p>
            <p style="font-size: 15px; line-height: 1.5; color: #334155;">
                Our Technical Lead (IIT Roorkee certified) is reviewing your requirements for <strong>{lead['tier']}</strong> and will reach out to you within 4 business hours with an initial architecture roadmap and custom quote.
            </p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2563eb;">
                <p style="margin: 0; font-size: 14px; color: #475569;">
                    Need immediate assistance? You can also message us directly on WhatsApp at 
                    <a href="https://wa.me/{settings.WHATSAPP_NUMBER.replace('+', '').replace(' ', '').replace('-', '')}" style="color: #16a34a; font-weight: bold;">{settings.WHATSAPP_NUMBER}</a>.
                </p>
            </div>
            <p style="font-size: 14px; color: #64748b; margin-top: 25px;">
                Best regards,<br>
                <strong>Lead Technical Architect</strong><br>
                AMP Ventures Web Agency
            </p>
        </div>
        """
        await send_smtp_email(lead["email"], client_subject, client_html)

    # 3. Discord & Telegram Webhooks
    await send_discord_webhook(lead)
    await send_telegram_alert(lead)
