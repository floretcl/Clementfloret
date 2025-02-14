from django.test.testcases import TestCase

from portfolio.models import ProjectImage, Project, ProjectType


class ProjectTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.project_type = [ProjectType.objects.create(
            id=1,
            name="Project Type",
            name_fr="Type de projet"
        )]
        cls.project = Project.objects.create(
            id=1,
            name="Test Project",
            name_fr="Projet de test",
            description="Test project description",
            description_fr="Description de projet de test",
            order=1
        )
        cls.project.project_type.set(cls.project_type)
        cls.project_image = ProjectImage.objects.create(
            id=1,
            name="project image",
            project=Project.objects.get(id=1),
            image="test_image1.jpg"
        )

    def test_model(self):
        self.assertEqual(str(self.project_image), "project image")