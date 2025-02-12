from http import HTTPStatus

from django.conf import settings
from django.test import TestCase
from django.urls.base import reverse, resolve

from bs4 import BeautifulSoup


class IndexTests(TestCase):
    def test_url_en(self):
        static_url = "/en/"
        _ = self.client.get(static_url)
        reversed_url = reverse("portfolio:index")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:index")
        self.assertEqual(resolve(static_url).view_name, "portfolio:index")

    def test_url_fr(self):
        static_url = "/"
        _ = self.client.get(static_url)
        reversed_url = reverse("portfolio:index")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:index")
        self.assertEqual(resolve(static_url).view_name, "portfolio:index")

    def test_get(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, HTTPStatus.OK)

    def test_get_en(self):
        response = self.client.get("/en/")

        soup = BeautifulSoup(response.content, "html.parser")
        html_tag = soup.find("html")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "text/html; charset=utf-8")
        self.assertTemplateUsed(response, "portfolio/index.html")
        self.assertEqual('en', html_tag.get("lang"))


    def test_get_fr(self):
        response = self.client.get("/")

        soup = BeautifulSoup(response.content, "html.parser")
        html_tag = soup.find("html")

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "text/html; charset=utf-8")
        self.assertTemplateUsed(response, "portfolio/index.html")
        self.assertEqual('fr', html_tag.get("lang"))
