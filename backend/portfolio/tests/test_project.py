import os
import shutil
from http import HTTPStatus

from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls.base import reverse, resolve

from portfolio.models import Project, ProjectType, Skill, Icon, ProjectLink, ProjectImage


class ProjectTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.project = Project.objects.create(
            id=1,
            name="Test Project",
            name_fr="Projet de test",
            description="Test project description",
            description_fr="Description de projet de test",
            project_type=ProjectType.objects.create(id=1, name="Project Type"),
            order=1
        )
        cls.skills = [Skill.objects.create(
            id=1,
            name="skill 1",
            icon=Icon.objects.create(id=1, name="icon skill 1", svg_file="uploads/icons/icon_skill_1.svg"),
            order=1
        ), Skill.objects.create(
            id=2,
            name="skill 2",
            icon=Icon.objects.create(id=2, name="icon skill 2", svg_file="uploads/icons/icon_skill_2.svg"),
            order=2
        )]
        cls.images = [ProjectImage.objects.create(
            id=1,
            name="image 1",
            project=Project.objects.get(id=1),
            image=SimpleUploadedFile(
                "test_image1.jpg",  # Nom du fichier
                b"file_content",  # Contenu fictif du fichier
                content_type="image/jpeg"  # Type MIME
            )
        ), ProjectImage.objects.create(
            id=2,
            name="image 2",
            project=Project.objects.get(id=1),
            image=SimpleUploadedFile(
                "test_image2.jpg",  # Nom du fichier
                b"file_content",  # Contenu fictif du fichier
                content_type="image/jpeg"  # Type MIME
            )
        )]
        cls.links = [ProjectLink.objects.create(
            id=1,
            name="Project Link 1",
            icon=Icon.objects.create(id=3, name="icon link 3", svg_file="uploads/icons/icon_link_3.svg"),
            url="https://example.com",
            project=Project.objects.get(id=1),
            order=1
        ), ProjectLink.objects.create(
            id=2,
            name="Project Link 2",
            icon=Icon.objects.create(id=4, name="icon link 4", svg_file="uploads/icons/icon_link_4.svg"),
            url="https://example.com",
            project=Project.objects.get(id=1),
            order=2
        )]
        cls.project.skill.set(cls.skills)

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        if os.path.exists("uploads"):
            shutil.rmtree("uploads")

    def test_url_en(self):
        self.client.cookies.load({settings.LANGUAGE_COOKIE_NAME: "en"})
        static_url = "/en/api/project"
        _ = self.client.get(static_url, query_params={"id": 1})
        reversed_url = reverse("portfolio:project")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:project")
        self.assertEqual(resolve(static_url).view_name, "portfolio:project")

    def test_url_fr(self):
        self.client.cookies.load({settings.LANGUAGE_COOKIE_NAME: "fr"})
        static_url = "/fr/api/project"
        _ = self.client.get(static_url, query_params={"id": 1})
        reversed_url = reverse("portfolio:project")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:project")
        self.assertEqual(resolve(static_url).view_name, "portfolio:project")

    def test_get(self):
        response = self.client.get("/api/project")
        self.assertEqual(response.status_code, HTTPStatus.FOUND)

    def test_get_en(self):
        response = self.client.get("/en/api/project", query_params={"id": 1})
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")
        self.assertEqual(response.json(), {
            "id": 1,
            "name": "Test Project",
            "description": "Test project description",
            "skills": [[1, 'skill 1'], [2, 'skill 2']],
            "type": "Project Type",
            "images": [{
                "id": 1,
                "name": "image 1",
                "image": "/media/uploads/images/test_image1.jpg"
            },{
                "id": 2,
                "name": "image 2",
                "image": "/media/uploads/images/test_image2.jpg"
            }],
            "links": [{
                "id": 1,
                "name": "Project Link 1",
                "icon": "/media/uploads/icons/icon_link_3.svg",
                "url": "https://example.com"
            },{
                "id": 2,
                "name": "Project Link 2",
                "icon": "/media/uploads/icons/icon_link_4.svg",
                "url": "https://example.com"
            }]
        })

    def test_get_fr(self):
        response = self.client.get("/fr/api/project", query_params={"id": 1})
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")
        self.assertEqual(response.json(), {
            "id": 1,
            "name": "Projet de test",
            "description": "Description de projet de test",
            "skills": [[1, 'skill 1'], [2, 'skill 2']],
            "type": "Project Type",
            "images": [{
                "id": 1,
                "name": "image 1",
                "image": "/media/uploads/images/test_image1.jpg"
            },{
                "id": 2,
                "name": "image 2",
                "image": "/media/uploads/images/test_image2.jpg"
            }],
            "links": [{
                "id": 1,
                "name": "Project Link 1",
                "icon": "/media/uploads/icons/icon_link_3.svg",
                "url": "https://example.com"
            },{
                "id": 2,
                "name": "Project Link 2",
                "icon": "/media/uploads/icons/icon_link_4.svg",
                "url": "https://example.com"
            }]
        })

    def test_model(self):
        self.assertEqual(str(self.project), "Test Project")
