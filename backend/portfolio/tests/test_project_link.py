from django.test.testcases import TestCase

from portfolio.models import ProjectLink, Project, Icon, ProjectType


class TestProjectLink(TestCase):
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
        cls.project_link = ProjectLink.objects.create(
            id=1,
            name="Project Link",
            icon=Icon.objects.create(id=1, name="icon link 1", svg_file="uploads/icons/icon_link_1.svg"),
            url="https://example.com",
            project=Project.objects.get(id=1),
            order=1
        )
    def test_model(self):
        self.assertEqual(str(self.project_link), "Project Link")
