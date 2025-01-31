from http import HTTPStatus

from django.conf import settings
from django.test import TestCase
from django.urls.base import reverse, resolve

from portfolio.models import PortfolioLink, Icon

class PortfolioLinksTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.portfolio_link = PortfolioLink.objects.create(
            id=1,
            name="link",
            icon=Icon.objects.create(id=1, name="icon link", svg_file="uploads/icons/icon_link.svg"),
            url="https://link.com",
            order=1
        )
        cls.portfolio_link2 = PortfolioLink.objects.create(
            id=2,
            name="link2",
            icon=Icon.objects.create(id=2, name="icon link2", svg_file="uploads/icons/icon_link2.svg"),
            url="https://link.com",
            order=2
        )

    def test_url_en(self):
        self.client.cookies.load({settings.LANGUAGE_COOKIE_NAME: "en"})
        static_url = "/en/api/portfolio_links"
        _ = self.client.get(static_url)
        reversed_url = reverse("portfolio:portfolio-links")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:portfolio-links")
        self.assertEqual(resolve(static_url).view_name, "portfolio:portfolio-links")

    def test_url_fr(self):
        self.client.cookies.load({settings.LANGUAGE_COOKIE_NAME: "fr"})
        static_url = "/fr/api/portfolio_links"
        _ = self.client.get(static_url)
        reversed_url = reverse("portfolio:portfolio-links")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:portfolio-links")
        self.assertEqual(resolve(static_url).view_name, "portfolio:portfolio-links")

    def test_get(self):
        response = self.client.get("/api/portfolio_links")
        self.assertEqual(response.status_code, HTTPStatus.FOUND)

    def test_get_en(self):
        response = self.client.get("/en/api/portfolio_links")
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")
        self.assertEqual(response.json(), [{
            "id": 1,
            "name": "link",
            "icon": "/media/uploads/icons/icon_link.svg",
            "url": "https://link.com"
        }, {
            "id": 2,
            "name": "link2",
            "icon": "/media/uploads/icons/icon_link2.svg",
            "url": "https://link.com"
        }])

    def test_get_fr(self):
        response = self.client.get("/fr/api/portfolio_links")
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")
        self.assertEqual(response.json(), [{
            "id": 1,
            "name": "link",
            "icon": "/media/uploads/icons/icon_link.svg",
            "url": "https://link.com"
        }, {
            "id": 2,
            "name": "link2",
            "icon": "/media/uploads/icons/icon_link2.svg",
            "url": "https://link.com"
        }])

    def test_model(self):
        self.assertEqual(str(self.portfolio_link), "link")
