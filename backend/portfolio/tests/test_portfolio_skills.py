from http import HTTPStatus

from django.conf import settings
from django.test import TestCase
from django.urls.base import reverse, resolve

from portfolio.models import Skill, Icon


class PortfolioSkillsTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.portfolio_skill = [Skill.objects.create(
            id=1,
            name="skill",
            icon=Icon.objects.create(id=1, name="icon skill", svg_file="uploads/icons/icon_skill.svg"),
            order=1
        ), Skill.objects.create(
            id=2,
            name="skill2",
            icon=Icon.objects.create(id=2, name="icon skill2", svg_file="uploads/icons/icon_skill2.svg"),
            order=2
        )]

    def test_url_en(self):
        static_url = "/en/api/portfolio_skills"
        _ = self.client.get(static_url)
        reversed_url = reverse("portfolio:portfolio-skills")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:portfolio-skills")
        self.assertEqual(resolve(static_url).view_name, "portfolio:portfolio-skills")

    def test_url_fr(self):
        static_url = "/api/portfolio_skills"
        _ = self.client.get(static_url)
        reversed_url = reverse("portfolio:portfolio-skills")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:portfolio-skills")
        self.assertEqual(resolve(static_url).view_name, "portfolio:portfolio-skills")

    def test_get(self):
        response = self.client.get("/api/portfolio_skills")
        self.assertEqual(response.status_code, HTTPStatus.OK)

    def test_get_en(self):
        response = self.client.get("/en/api/portfolio_skills")
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")
        self.assertEqual(response.json(), [{
            "id": 1,
            "name": "skill",
            "icon": "/media/uploads/icons/icon_skill.svg",
        }, {
            "id": 2,
            "name": "skill2",
            "icon": "/media/uploads/icons/icon_skill2.svg",
        }])

    def test_get_fr(self):
        response = self.client.get("/api/portfolio_skills")
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")
        self.assertEqual(response.json(), [{
            "id": 1,
            "name": "skill",
            "icon": "/media/uploads/icons/icon_skill.svg",
        }, {
            "id": 2,
            "name": "skill2",
            "icon": "/media/uploads/icons/icon_skill2.svg",
        }])