import unittest
from fastapi.testclient import TestClient
from app.main import app
from app.db import init_db
from app.config import settings
from app.auth import create_access_token

class TestAmpVenturesBackend(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_db()
        cls.client = TestClient(app)
        cls.admin_key = settings.ADMIN_SECRET_KEY or "amp_admin_secret_key_2026"
        cls.jwt_token = create_access_token({"sub": "test_admin", "role": "admin"})

    def test_01_health_check_with_db_probe(self):
        res = self.client.get("/api/health")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["status"], "online")
        self.assertIn("database", data)
        self.assertEqual(data["database"]["status"], "healthy")
        self.assertGreaterEqual(data["database"]["latency_ms"], 0)
        self.assertIn("IIT Roorkee", data["founder_credentials"])

    def test_02_security_and_telemetry_headers(self):
        res = self.client.get("/api/health")
        headers = res.headers
        self.assertEqual(headers.get("X-Content-Type-Options"), "nosniff")
        self.assertEqual(headers.get("X-Frame-Options"), "DENY")
        self.assertIn("X-Request-ID", headers)
        self.assertIn("X-Process-Time-Ms", headers)

    def test_03_prometheus_metrics_endpoint(self):
        res = self.client.get("/metrics")
        self.assertEqual(res.status_code, 200)
        self.assertTrue("http_requests_total" in res.text or "http" in res.text)

    def test_04_auth_token_issuance(self):
        # 1. Valid Key
        res = self.client.post("/api/auth/token", json={"admin_key": self.admin_key})
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("access_token", data)
        self.assertEqual(data["token_type"], "bearer")
        self.assertEqual(data["role"], "admin")

        # 2. Invalid Key
        res_bad = self.client.post("/api/auth/token", json={"admin_key": "wrong_key_123"})
        self.assertEqual(res_bad.status_code, 401)

    def test_05_auth_session_verification(self):
        # 1. Test with Bearer JWT
        res = self.client.get("/api/auth/me", headers={"Authorization": f"Bearer {self.jwt_token}"})
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertTrue(data["authenticated"])

        # 2. Test with X-Admin-Key header
        res2 = self.client.get("/api/auth/me", headers={"X-Admin-Key": self.admin_key})
        self.assertEqual(res2.status_code, 200)

        # 3. Test without auth
        res_unauth = self.client.get("/api/auth/me")
        self.assertEqual(res_unauth.status_code, 401)

    def test_06_contact_lead_submission(self):
        payload = {
            "name": "Dr. Aarav Patel",
            "business_name": "Patel Diagnostic Clinic",
            "email": "aarav@patelclinic.com",
            "phone": "+91 98765 43210",
            "tier": "Tier 2 - Premium (CMS & Reviews)",
            "budget": "₹25,000 - ₹35,000",
            "message": "We need an online appointment roster."
        }
        res = self.client.post("/api/contact", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertTrue(data["success"])
        self.assertIn("lead_id", data)

    def test_07_contact_honeypot_spam_trap(self):
        payload = {
            "name": "Spam Bot",
            "business_name": "Spam Corp",
            "email": "bot@spam.com",
            "phone": "+1 234 567 8900",
            "hp_field": "I am a hidden spam bot field"
        }
        res = self.client.post("/api/contact", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["lead_id"], 0) # Trapped without DB insert

    def test_08_protected_leads_retrieval(self):
        # Authenticated with Bearer JWT
        res = self.client.get("/api/leads", headers={"Authorization": f"Bearer {self.jwt_token}"})
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("leads", data)
        self.assertGreaterEqual(len(data["leads"]), 1)

    def test_09_readiness_score(self):
        payload = {
            "business_name": "Luxe Glam Salon",
            "city": "Bengaluru",
            "industry": "Salon & Spa",
            "has_website": False,
            "has_google_maps": True,
            "has_social": True,
            "accepts_online_booking": False,
            "email": "owner@luxeglam.com",
            "phone": "+91 99887 76655"
        }
        res = self.client.post("/api/readiness-score", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("score", data)
        self.assertIn("checklist", data)
        self.assertIn("recommended_tier", data)

    def test_10_chatbot_inquiry(self):
        payload = {
            "message": "How much does Tier 2 cost and what is included?"
        }
        res = self.client.post("/api/chatbot", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("reply", data)
        self.assertIn("suggested_actions", data)

    def test_11_cached_portfolio_case_studies(self):
        res = self.client.get("/api/portfolio")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("case_studies", data)
        self.assertGreaterEqual(len(data["case_studies"]), 3)

    def test_12_mockup_generation(self):
        payload = {
            "business_name": "Royal Treat Cafe",
            "city": "Pune",
            "industry": "restaurant"
        }
        res = self.client.post("/api/mockup/generate", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["business_name"], "Royal Treat Cafe")
        self.assertIn("services", data)
        self.assertIn("reviews", data)

if __name__ == "__main__":
    unittest.main()
