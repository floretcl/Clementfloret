from django.test.testcases import TestCase

from portfolio.models import Skill, Icon


class SkillTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.skill = Skill.objects.create(
            id=1,
            name="skill 1",
            icon=Icon.objects.create(id=1, name="icon skill 1", svg_file="media/uploads/icons/icon_skill_1.svg"),
            order=1
        )

    def test_model(self):
        self.assertEqual(str(self.skill), "skill 1")
