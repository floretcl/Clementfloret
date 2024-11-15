import unittest
from http import HTTPStatus
from django.test import Client


class RobotsTxtTests(unittest.TestCase):
    def setUp(self):
        self.client = Client()

    def test_get(self):
        response = self.client.get("/robots.txt")

        self.assertEqual(response.status_code, HTTPStatus.FOUND)

    def test_get_en(self):
        response = self.client.get("/en/robots.txt")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.templates[0].name, "portfolio/robots.txt")
        self.assertEqual(response.headers['Content-Type'], "text/plain")

    def test_get_fr(self):
        response = self.client.get("/fr/robots.txt")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.templates[0].name, "portfolio/robots.txt")
        self.assertEqual(response.headers['Content-Type'], "text/plain")


class IndexTests(unittest.TestCase):
    def setUp(self):
        self.client = Client()

    def test_get(self):
        response = self.client.get("/")

        self.assertEqual(response.status_code, HTTPStatus.FOUND)

    def test_get_en(self):
        response = self.client.get("/en/")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "text/html; charset=utf-8")
        self.assertEqual(response.templates[0].name, "portfolio/index.html")

    def test_get_fr(self):
        response = self.client.get("/fr/")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "text/html; charset=utf-8")
        self.assertEqual(response.templates[0].name, "portfolio/index.html")


class ApiPortfolioTests(unittest.TestCase):
    def setUp(self):
        self.client = Client()

    def test_get(self):
        response = self.client.get("/api/portfolio")

        self.assertEqual(response.status_code, HTTPStatus.FOUND)

    def test_get_en(self):
        response = self.client.get("/en/api/portfolio")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")

    def test_get_fr(self):
        response = self.client.get("/fr/api/portfolio")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")


class ApiPortfolioLinksTests(unittest.TestCase):
    def setUp(self):
        self.client = Client()

    def test_get(self):
        response = self.client.get("/api/portfolio_links")

        self.assertEqual(response.status_code, HTTPStatus.FOUND)

    def test_get_en(self):
        response = self.client.get("/en/api/portfolio_links")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")

    def test_get_fr(self):
        response = self.client.get("/fr/api/portfolio_links")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")

class ApiPortfolioSkillsTests(unittest.TestCase):
    def setUp(self):
        self.client = Client()

    def test_get(self):
        response = self.client.get("/api/portfolio_skills")

        self.assertEqual(response.status_code, HTTPStatus.FOUND)

    def test_get_en(self):
        response = self.client.get("/en/api/portfolio_skills")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")

    def test_get_fr(self):
        response = self.client.get("/fr/api/portfolio_skills")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")


class ApiProjectTypesTests(unittest.TestCase):
    def setUp(self):
        self.client = Client()

    def test_get(self):
        response = self.client.get("/api/project_types")

        self.assertEqual(response.status_code, HTTPStatus.FOUND)

    def test_get_en(self):
        response = self.client.get("/en/api/project_types")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")

    def test_get_fr(self):
        response = self.client.get("/fr/api/project_types")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")


class ApiProjectsTests(unittest.TestCase):
    def setUp(self):
        self.client = Client()

    def test_get(self):
        response = self.client.get("/api/projects")

        self.assertEqual(response.status_code, HTTPStatus.FOUND)

    def test_get_en(self):
        response = self.client.get("/en/api/projects")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")

    def test_get_fr(self):
        response = self.client.get("/fr/api/projects")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")


class ApiProjectTests(unittest.TestCase):
    def setUp(self):
        self.client = Client()

    def test_get(self):
        response = self.client.get("/api/project")

        self.assertEqual(response.status_code, HTTPStatus.FOUND)

    def test_get_en(self):
        response = self.client.get("/en/api/project", query_params={"id": 1})

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")

    def test_get_fr(self):
        response = self.client.get("/en/api/project", query_params={"id": 1})

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")


class ApiContactTests(unittest.TestCase):
    def setUp(self):
        self.client = Client()

    def test_get(self):
        response = self.client.get("/api/contact")

        self.assertEqual(response.status_code, HTTPStatus.FOUND)

    def test_get_en(self):
        response = self.client.get("/fr/api/contact")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")

    def test_get_fr(self):
        response = self.client.get("/en/api/contact")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")

    def test_post(self):
        response = self.client.post("/api/contact")

        self.assertEqual(response.status_code, HTTPStatus.FOUND)

    def test_post_en(self):
        response = self.client.post(
            "/en/api/contact",
            {
                "name": "John Doe",
                "email": "john@doe.email",
                "subject": "Hello world",
                "message": "Hello world! I'm John Doe"},
                content_type="application/json")

        self.assertEqual(response.status_code, HTTPStatus.OK)

    def test_post_fr(self):
        response = self.client.post(
            "/fr/api/contact",
            {
                "name": "John Doe",
                "email": "john@doe.email",
                "subject": "Hello world",
                "message": "Hello world! I'm John Doe"},
                content_type="application/json")

        self.assertEqual(response.status_code, HTTPStatus.OK)

    def test_post_en_bad_request(self):
        response = self.client.post("/en/api/contact")

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)

    def test_post_fr_bad_request(self):
        response = self.client.post("/en/api/contact")

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
