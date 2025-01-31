from django.conf import settings
from django.test.testcases import TestCase
from django.urls.base import reverse

class LanguageTests(TestCase):
    def test_language_default_using_cookie(self):
        _ = self.client.get("/")
        reversed_url = reverse("portfolio:index")
        static_url = "/en/"
        self.assertEqual(reversed_url, static_url)

    def test_language_en_using_cookie(self):
        self.client.cookies.load({settings.LANGUAGE_COOKIE_NAME: "en"})
        _ = self.client.get("/")
        reversed_url = reverse("portfolio:index")
        static_url = "/en/"
        self.assertEqual(reversed_url, static_url)

    def test_language_fr_using_cookie(self):
        self.client.cookies.load({settings.LANGUAGE_COOKIE_NAME: "fr"})
        _ = self.client.get("/")
        reversed_url = reverse("portfolio:index")
        static_url = "/fr/"
        self.assertEqual(reversed_url, static_url)