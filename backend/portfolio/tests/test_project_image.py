from django.test.testcases import TestCase

from portfolio.models import ProjectImage, Project, ProjectType


class ProjectTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Project.objects.create(
            id=1,
            name="Test Project",
            name_fr="Projet de test",
            description="Test project description",
            description_fr="Description de projet de test",
            project_type=ProjectType.objects.create(id=1, name="Project Type"),
            order=1
        )
        cls.project_image = ProjectImage.objects.create(
            id=1,
            name="project image",
            project=Project.objects.get(id=1),
            image="test_image1.jpg"
        )

    def test_model(self):
        self.assertEqual(str(self.project_image), "project image")