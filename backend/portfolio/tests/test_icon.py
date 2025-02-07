from django.test.testcases import TestCase

from portfolio.models import Icon


class IconTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.icon = Icon.objects.create(
            id=1,
            name="icon skill 1",
            svg_file="media/uploads/icons/icon_skill_1.svg"
        )
    def test_model(self):
        self.assertEqual(str(self.icon), "icon skill 1")