import os
import shutil
from http import HTTPStatus

from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls.base import reverse, resolve

from portfolio.models import Project, ProjectType, Skill, Icon, ProjectLink, ProjectImage


class ProjectsTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.project1 = Project.objects.create(
            id=1,
            name="Test Project",
            name_fr="Projet de test",
            description="Test project description",
            description_fr="Description de projet de test",
            project_type=ProjectType.objects.create(id=1, name="Project Type"),
            order=1
        )
        cls.project2 = Project.objects.create(
            id=2,
            name="Test Project 2",
            name_fr="Projet de test 2",
            description="Test project description 2",
            description_fr="Description de projet de test 2",
            project_type=ProjectType.objects.create(id=2, name="Project Type 2"),
            order=2
        )
        cls.skills_project1 = [Skill.objects.create(
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
        cls.skills_project2 = [Skill.objects.create(
            id=3,
            name="skill 3",
            icon=Icon.objects.create(id=3, name="icon skill 3", svg_file="uploads/icons/icon_skill_3.svg"),
            order=3
        ), Skill.objects.create(
            id=4,
            name="skill 4",
            icon=Icon.objects.create(id=4, name="icon skill 4", svg_file="uploads/icons/icon_skill_4.svg"),
            order=4
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
        ), ProjectImage.objects.create(
            id=3,
            name="image 3",
            project=Project.objects.get(id=2),
            image=SimpleUploadedFile(
                "test_image3.jpg",  # Nom du fichier
                b"file_content",  # Contenu fictif du fichier
                content_type="image/jpeg"  # Type MIME
            )
        ), ProjectImage.objects.create(
            id=4,
            name="image 4",
            project=Project.objects.get(id=2),
            image=SimpleUploadedFile(
                "test_image4.jpg",  # Nom du fichier
                b"file_content",  # Contenu fictif du fichier
                content_type="image/jpeg"  # Type MIME
            )
        )]
        cls.links = [ProjectLink.objects.create(
            id=1,
            name="Project Link 1",
            icon=Icon.objects.create(id=5, name="icon link 5", svg_file="uploads/icons/icon_link_5.svg"),
            url="https://example.com",
            project=Project.objects.get(id=1),
            order=1
        ), ProjectLink.objects.create(
            id=2,
            name="Project Link 2",
            icon=Icon.objects.create(id=6, name="icon link 6", svg_file="uploads/icons/icon_link_6.svg"),
            url="https://example.com",
            project=Project.objects.get(id=1),
            order=2
        ), ProjectLink.objects.create(
            id=3,
            name="Project Link 3",
            icon=Icon.objects.create(id=7, name="icon link 7", svg_file="uploads/icons/icon_link_7.svg"),
            url="https://example.com",
            project=Project.objects.get(id=2),
            order=3
        ), ProjectLink.objects.create(
            id=4,
            name="Project Link 4",
            icon=Icon.objects.create(id=8, name="icon link 8", svg_file="uploads/icons/icon_link_8.svg"),
            url="https://example.com",
            project=Project.objects.get(id=2),
            order=4
        )]
        cls.project1.skill.set(cls.skills_project1)
        cls.project2.skill.set(cls.skills_project2)

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        if cls.images:
            for image in cls.images:
                image_path = image.image.path
                if os.path.exists(image_path):
                    os.remove(image_path)

    def test_url_en(self):
        self.client.cookies.load({settings.LANGUAGE_COOKIE_NAME: "en"})
        static_url = "/en/api/projects"
        _ = self.client.get(static_url)
        reversed_url = reverse("portfolio:projects")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:projects")
        self.assertEqual(resolve(static_url).view_name, "portfolio:projects")

    def test_url_fr(self):
        self.client.cookies.load({settings.LANGUAGE_COOKIE_NAME: "fr"})
        static_url = "/fr/api/projects"
        _ = self.client.get(static_url)
        reversed_url = reverse("portfolio:projects")
        self.assertEqual(reversed_url, static_url)
        self.assertEqual(resolve(reversed_url).view_name, "portfolio:projects")
        self.assertEqual(resolve(static_url).view_name, "portfolio:projects")

    def test_get(self):
        response = self.client.get("/api/projects")
        self.assertEqual(response.status_code, HTTPStatus.FOUND)

    def test_get_en(self):
        response = self.client.get("/en/api/projects")
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")
        self.assertEqual(response.json(), [{
            "id": 1,
            "name": "Test Project",
            "description": "Test project description",
            "type": "Project Type",
            "images": [{
                "id": 1,
                "name": "image 1",
                "url": "/media/uploads/images/test_image1.jpg"
            }, {
                "id": 2,
                "name": "image 2",
                "url": "/media/uploads/images/test_image2.jpg"
            }]
        }, {
            "id": 2,
            "name": "Test Project 2",
            "description": "Test project description 2",
            "type": "Project Type 2",
            "images": [{
                "id": 3,
                "name": "image 3",
                "url": "/media/uploads/images/test_image3.jpg"
            }, {
                "id": 4,
                "name": "image 4",
                "url": "/media/uploads/images/test_image4.jpg"
            }]
        }])

    def test_get_fr(self):
        response = self.client.get("/fr/api/projects")
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.headers['Content-Type'], "application/json")
        self.assertEqual(response.json(), [{
            "id": 1,
            "name": "Projet de test",
            "description": "Description de projet de test",
            "type": "Project Type",
            "images": [{
                "id": 1,
                "name": "image 1",
                "url": "/media/uploads/images/test_image1.jpg"
            }, {
                "id": 2,
                "name": "image 2",
                "url": "/media/uploads/images/test_image2.jpg"
            }]
        }, {
            "id": 2,
            "name": "Projet de test 2",
            "description": "Description de projet de test 2",
            "type": "Project Type 2",
            "images": [{
                "id": 3,
                "name": "image 3",
                "url": "/media/uploads/images/test_image3.jpg"
            }, {
                "id": 4,
                "name": "image 4",
                "url": "/media/uploads/images/test_image4.jpg"
            }]
        }])
