from http import HTTPStatus

from django.conf import settings
from django.test import TestCase
from django.urls.base import reverse, resolve


class RobotsTxtTests(TestCase):
    def test_url_en(self):
        self.client.cookies.load({settings.LANGUAGE_COOKIE_NAME: "en"})
        static_url = "/en/robots.txt"
        _ = self.client.get(static_url)
        reversed_url = reverse("portfolio:robots")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:robots")
        self.assertEqual(resolve(static_url).view_name, "portfolio:robots")

    def test_url_fr(self):
        self.client.cookies.load({settings.LANGUAGE_COOKIE_NAME: "fr"})
        static_url = "/robots.txt"
        _ = self.client.get(static_url)
        reversed_url = reverse("portfolio:robots")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:robots")
        self.assertEqual(resolve(static_url).view_name, "portfolio:robots")

    def test_get(self):
        response = self.client.get("/robots.txt")
        self.assertEqual(response.status_code, HTTPStatus.OK)

    def test_get_en(self):
        response = self.client.get("/en/robots.txt")
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "text/plain")
        self.assertTemplateUsed(response, "portfolio/robots.txt")

    def test_get_fr(self):
        response = self.client.get("/robots.txt")
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "text/plain")
        self.assertTemplateUsed(response, "portfolio/robots.txt")
