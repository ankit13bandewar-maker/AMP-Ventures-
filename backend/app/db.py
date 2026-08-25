import sqlite3
import os
import json
from datetime import datetime, timezone

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "amp_ventures.db")

def get_db_connection():
    """Create and return a connection to the SQLite database with row dictionary mapping."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize database tables for leads and readiness checks."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Leads table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        business_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        tier TEXT DEFAULT 'Tier 1 - Basic',
        budget TEXT DEFAULT 'Standard',
        message TEXT,
        status TEXT DEFAULT 'New',
        created_at TEXT NOT NULL
    );
    """)

    # Digital Readiness Checks table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS readiness_checks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        business_name TEXT NOT NULL,
        city TEXT NOT NULL,
        industry TEXT NOT NULL,
        has_website INTEGER NOT NULL,
        has_google_maps INTEGER DEFAULT 0,
        has_social INTEGER DEFAULT 0,
        accepts_online_booking INTEGER DEFAULT 0,
        score INTEGER NOT NULL,
        checklist_json TEXT,
        email TEXT,
        phone TEXT,
        created_at TEXT NOT NULL
    );
    """)

    conn.commit()
    conn.close()

def insert_lead(name: str, business_name: str, email: str, phone: str, tier: str, budget: str, message: str) -> dict:
    """Insert a new lead into SQLite database."""
    conn = get_db_connection()
    cursor = conn.cursor()
    created_at = datetime.now(timezone.utc).isoformat()
    
    cursor.execute("""
    INSERT INTO leads (name, business_name, email, phone, tier, budget, message, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'New', ?)
    """, (name, business_name, email, phone, tier, budget, message, created_at))
    
    lead_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return {
        "id": lead_id,
        "name": name,
        "business_name": business_name,
        "email": email,
        "phone": phone,
        "tier": tier,
        "budget": budget,
        "message": message,
        "status": "New",
        "created_at": created_at
    }

def get_all_leads(limit: int = 100) -> list[dict]:
    """Retrieve all leads ordered by newest first."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM leads ORDER BY id DESC LIMIT ?", (limit,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def insert_readiness_check(
    business_name: str,
    city: str,
    industry: str,
    has_website: bool,
    has_google_maps: bool,
    has_social: bool,
    accepts_online_booking: bool,
    score: int,
    checklist: list,
    email: str = None,
    phone: str = None
) -> dict:
    """Insert a digital readiness check entry."""
    conn = get_db_connection()
    cursor = conn.cursor()
    created_at = datetime.now(timezone.utc).isoformat()
    checklist_json = json.dumps(checklist)
    
    cursor.execute("""
    INSERT INTO readiness_checks (
        business_name, city, industry, has_website, has_google_maps, 
        has_social, accepts_online_booking, score, checklist_json, email, phone, created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        business_name, city, industry, int(has_website), int(has_google_maps),
        int(has_social), int(accepts_online_booking), score, checklist_json, email, phone, created_at
    ))
    
    check_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return {
        "id": check_id,
        "business_name": business_name,
        "city": city,
        "industry": industry,
        "score": score,
        "checklist": checklist,
        "created_at": created_at
    }

def get_all_readiness_checks(limit: int = 100) -> list[dict]:
    """Retrieve all readiness checks."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM readiness_checks ORDER BY id DESC LIMIT ?", (limit,))
    rows = cursor.fetchall()
    conn.close()
    
    results = []
    for r in rows:
        item = dict(r)
        if item.get("checklist_json"):
            try:
                item["checklist"] = json.loads(item["checklist_json"])
            except Exception:
                item["checklist"] = []
        results.append(item)
    return results
