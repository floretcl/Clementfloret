import os
import shutil
from http import HTTPStatus

from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls.base import reverse, resolve

from portfolio.models import Portfolio


class PortfolioTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.portfolio = Portfolio.objects.create(
            id=1,
            name="Portfolio en",
            name_fr="Portfolio fr",
            firstname="Clément",
            lastname="Floret",
            job_title="Developer",
            job_title_fr="Développeur",
            contact_email="clement.floret@protonmail.com",
            about_description="About the portfolio",
            about_description_fr="À propos du portfolio",
            avatar=SimpleUploadedFile(
                "test_avatar.png",  # Nom du fichier
                b"file_content",  # Contenu fictif du fichier
                content_type="image/png"  # Type MIME
            ),
            resume=SimpleUploadedFile(
                "test_resume.pdf",  # Nom du fichier
                b"file_content",  # Contenu fictif du fichier
                content_type="application/pdf"  # Type MIME
            ),
            resume_fr=SimpleUploadedFile(
                "test_resume_fr.pdf",  # Nom du fichier
                b"file_content",  # Contenu fictif du fichier
                content_type="application/pdf"  # Type MIME
            ),
            active=True
        )

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        if os.path.exists("uploads"):
            shutil.rmtree("uploads")

    def test_url_en(self):
        self.client.cookies.load({settings.LANGUAGE_COOKIE_NAME: "en"})
        static_url = "/en/api/portfolio"
        _ = self.client.get(static_url)
        reversed_url = reverse("portfolio:about")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:about")
        self.assertEqual(resolve(static_url).view_name, "portfolio:about")

    def test_url_fr(self):
        self.client.cookies.load({settings.LANGUAGE_COOKIE_NAME: "fr"})
        static_url = "/fr/api/portfolio"
        _ = self.client.get(static_url)
        reversed_url = reverse("portfolio:about")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:about")
        self.assertEqual(resolve(static_url).view_name, "portfolio:about")

    def test_get(self):
        response = self.client.get("/api/portfolio")
        self.assertEqual(response.status_code, HTTPStatus.FOUND)

    def test_get_en(self):
        response = self.client.get("/en/api/portfolio")
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")
        self.assertEqual(response.json(), {
            "id": 1,
            "name": "Portfolio en",
            "firstname": "Clément",
            "lastname": "Floret",
            "job_title": "Developer",
            "contact_email": "clement.floret@protonmail.com",
            "about_description": "About the portfolio",
            "avatar": "/media/uploads/avatar/test_avatar.png",
            "resume": "/media/uploads/resume/test_resume.pdf",
        })

    def test_get_fr(self):
        response = self.client.get("/fr/api/portfolio")
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")
        self.assertEqual(response.json(), {
            "id": 1,
            "name": "Portfolio fr",
            "firstname": "Clément",
            "lastname": "Floret",
            "job_title": "Développeur",
            "contact_email": "clement.floret@protonmail.com",
            "about_description": "À propos du portfolio",
            "avatar": "/media/uploads/avatar/test_avatar.png",
            "resume": "/media/uploads/resume/test_resume_fr.pdf",
        })

    def test_model(self):
        self.assertEqual(str(self.portfolio), "Portfolio en")

