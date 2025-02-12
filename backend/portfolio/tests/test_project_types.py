from http import HTTPStatus

from django.conf import settings
from django.test import TestCase
from django.urls.base import reverse, resolve

from portfolio.models import ProjectType

class ProjectTypesTests(TestCase):
    @classmethod
    def setUpTestData(cls):

        cls.project_type = ProjectType.objects.create(
            id=1,
            name="Test Project Type",
            name_fr="Type de projet de test",
        )
        cls.project_type2 = ProjectType.objects.create(
            id=2,
            name="Test Project Type 2",
            name_fr="Type de projet de test 2",
        )

    def test_url_en(self):
        static_url = "/en/api/project_types"
        _ = self.client.get(static_url)
        reversed_url = reverse("portfolio:project-types")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:project-types")
        self.assertEqual(resolve(static_url).view_name, "portfolio:project-types")

    def test_url_fr(self):
        static_url = "/api/project_types"
        _ = self.client.get(static_url)
        reversed_url = reverse("portfolio:project-types")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:project-types")
        self.assertEqual(resolve(static_url).view_name, "portfolio:project-types")

    def test_get(self):
        response = self.client.get("/api/project_types")
        self.assertEqual(response.status_code, HTTPStatus.OK)

    def test_get_en(self):
        response = self.client.get("/en/api/project_types")
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")
        self.assertEqual(response.json(), [{
            "id": 1,
            "name": "Test Project Type",
        }, {
            "id": 2,
            "name": "Test Project Type 2",
        }])

    def test_get_fr(self):
        response = self.client.get("/api/project_types")
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")
        self.assertEqual(response.json(), [{
            "id": 1,
            "name": "Type de projet de test"
        }, {
            "id": 2,
            "name": "Type de projet de test 2",
        }])

    def test_model(self):
        self.assertEqual(str(self.project_type), "Test Project Type")
