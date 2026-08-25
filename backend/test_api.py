import unittest
from fastapi.testclient import TestClient
from app.main import app
from app.db import init_db

class TestAmpVenturesAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_db()
        cls.client = TestClient(app)

    def test_health_check(self):
        res = self.client.get("/api/health")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["status"], "online")
        self.assertIn("IIT Roorkee", data["founder_credentials"])

    def test_contact_form_submission(self):
        payload = {
            "name": "Dr. Aarav Patel",
            "business_name": "Patel Diagnostic Clinic",
            "email": "aarav@patelclinic.com",
            "phone": "+91 98765 43210",
            "tier": "Tier 2 - Premium (CMS & Reviews)",
            "budget": "₹25,000 - ₹35,000",
            "message": "We need a doctor roster and online appointment booking."
        }
        res = self.client.post("/api/contact", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertTrue(data["success"])
        self.assertIn("lead_id", data)

    def test_leads_retrieval(self):
        res = self.client.get("/api/leads")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("leads", data)
        self.assertGreaterEqual(len(data["leads"]), 1)

    def test_readiness_score(self):
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

    def test_chatbot_inquiry(self):
        payload = {
            "message": "How much does Tier 2 cost and what is included?"
        }
        res = self.client.post("/api/chatbot", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("reply", data)
        self.assertIn("suggested_actions", data)

    def test_portfolio_case_studies(self):
        res = self.client.get("/api/portfolio")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("case_studies", data)
        self.assertGreaterEqual(len(data["case_studies"]), 3)

if __name__ == "__main__":
    unittest.main()
