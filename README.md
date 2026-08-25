# AMP VENTURES — Fullstack Web Development Agency Platform

> Conversion-focused web engineering platform tailored for offline businesses (salons, clinics, restaurants, and retail shops) transitioning online.

---

## ⚡ Overview

**AMP VENTURES** is a decoupled fullstack platform built to turn local walk-ins into automated digital bookings, table reservations, and inbound leads.

### 🌟 Key Features
- **3-Tier Service Architecture**:
  - **Tier 1 (Basic)**: 4–6 page high-speed static website with Google Business Profile linkage.
  - **Tier 2 (Premium + CMS)**: Custom lightweight client CMS, Google Reviews widget, and SEO tracking.
  - **Tier 3 (Premium Plus 3D & Automation)**: 3D interactive WebGL hero, WhatsApp Business API automation, and 24/7 AI chatbot assistant.
- **Interactive Lead Magnets**:
  - **Digital Readiness Score Tool**: 60-second diagnostic calculating a 0–100 maturity score with custom gap analysis.
  - **Direct Lead Capture**: Persisted into SQLite backend with instant reference ID generation.
- **Floating Action Suite**:
  - Direct WhatsApp click-to-chat integration with pre-filled inquiries.
  - AI Assistant Widget with context-aware tier suggestions.
- **Internal Admin Dashboard**:
  - Centralized leads and readiness checks viewer.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, React Router, Modern CSS (Design Tokens, Glassmorphism, Responsive Grid).
- **Backend**: Python 3.14 / FastAPI, Pydantic v2, Uvicorn.
- **Database**: SQLite (Repository pattern in `db.py`, easily migratable to PostgreSQL).

---

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python run.py
```
Backend runs at `http://127.0.0.1:8000` (Swagger UI at `/docs`).

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`.

---

## 🧪 Automated Testing
```bash
cd backend
python test_api.py
```

---

## 📄 License
MIT License. Built by [AMP VENTURES](https://github.com/ankit13bandewar-maker/AMP-Ventures-).
