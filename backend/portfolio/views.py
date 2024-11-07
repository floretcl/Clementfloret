import json
from json import JSONDecodeError
from django.utils import translation
from django.utils.translation import gettext_lazy as _
from django.http import JsonResponse
from django.views.generic import TemplateView, View

from .forms import ContactForm
from .models import Portfolio, PortfolioLink, ProjectType, Project, ProjectLink, ProjectImage, Skill


class IndexView(TemplateView):
    template_name = 'portfolio/index.html'


class PortfolioView(View):
    @staticmethod
    def get(request, *args, **kwargs):
        current_language = translation.get_language()
        portfolio = Portfolio.objects.filter(active=True).first()

        portfolio_data = {
            "id": portfolio.pk,
            "name": getattr(portfolio, 'name_fr' if current_language == 'fr' else 'name'),
            "firstname": portfolio.firstname,
            "lastname": portfolio.lastname,
            "job_title": getattr(portfolio, 'job_title_fr' if current_language == 'fr' else 'job_title'),
            "contact_email": portfolio.contact_email,
            "about_description": getattr(portfolio,
                                         'about_description_fr' if current_language == 'fr' else 'about_description'),
            "avatar": portfolio.avatar.url,
            "resume": getattr(portfolio, 'resume_fr' if current_language == 'fr' else 'resume').url,
        }

        return JsonResponse(portfolio_data)


class PortfolioLinksView(View):
    @staticmethod
    def get(request, *args, **kwargs):
        portfolio = Portfolio.objects.filter(active=True).first()
        links = PortfolioLink.objects.filter(portfolio=portfolio).order_by('order')

        links_data = [
            {
                "id": link.pk,
                "name": link.name,
                "icon": link.icon.svg_file.url if link.icon else None,
                "url": link.url,
            }
            for link in links
        ]

        return JsonResponse(links_data, safe=False)


class PortfolioSkillsView(View):
    @staticmethod
    def get(request, *args, **kwargs):
        portfolio = Portfolio.objects.filter(active=True).first()
        skills = Skill.objects.filter(portfolio=portfolio).order_by('order')

        skills_data = [
            {
                "id": skill.pk,
                "name": skill.name,
                "icon": skill.icon.svg_file.url if skill.icon else None,
            }
            for skill in skills if skill.icon is not None
        ]

        return JsonResponse(skills_data, safe=False)


class ProjectTypesView(View):
    @staticmethod
    def get(request, *args, **kwargs):
        current_language = translation.get_language()
        portfolio = Portfolio.objects.filter(active=True).first()
        project_types = ProjectType.objects.filter(portfolio=portfolio).order_by()
        project_types_data = [
            {
                "id": project_type.pk,
                "name": getattr(project_type, 'name_fr' if current_language == 'fr' else 'name'),
            }
            for project_type in project_types
        ]

        return JsonResponse(project_types_data, safe=False)


class ProjectsView(View):
    def get(self, request, *args, **kwargs):
        current_language = translation.get_language()
        portfolio = Portfolio.objects.filter(active=True).first()
        project_type = self.request.GET.get('type')
        if project_type:
            projects = Project.objects.filter(project_type=project_type).order_by('order')
        else:
            projects = Project.objects.filter(portfolio=portfolio).order_by('order')


        projects_data = [
            {
                "id": project.pk,
                "name": getattr(project, 'name_fr' if current_language == 'fr' else 'name'),
                "description": getattr(project, "description_fr" if current_language == 'fr' else 'description'),
                "type": project.project_type.name,
                "images": [
                    {
                        "id": image.id,
                        "name": image.name,
                        "url": image.image.url
                    }
                    for image in ProjectImage.objects.filter(project=project).order_by()
                ]
            }
            for project in projects
        ]

        return JsonResponse(projects_data, safe=False)


class ProjectView(View):
    def get(self, request, *args, **kwargs):
        current_language = translation.get_language()
        index = self.request.GET.get('id')
        project = Project.objects.filter(pk=index).first()

        project_data = {
            "id": project.pk,
            "name": getattr(project, 'name_fr' if current_language == 'fr' else 'name'),
            "description": getattr(project, 'description_fr' if current_language == 'fr' else 'description'),
            "skills": list(project.skill.values_list("id", "name").order_by("order")),
            "type": project.project_type.name,
            "images": [
                {
                    "id": image.pk,
                    "name": image.name,
                    "image": image.image.url
                }
                for image in ProjectImage.objects.filter(project=project).order_by()
            ],
            "links": [
                {
                    "id": link.pk,
                    "name": link.name,
                    "icon": link.icon.svg_file.url if link.icon else None,
                    "url": link.url
                }
                for link in ProjectLink.objects.filter(project=project).order_by('order')
            ]
        }

        return JsonResponse(project_data, safe=False)


class ContactView(View):
    template_name = 'portfolio/contact.html'
    form_class = ContactForm
    success_url = '/'
    success_message = _('Tank you {name}. Your message has been sent.')
    error_message = _('Your message could not be sent.')

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
        except JSONDecodeError:
            return JsonResponse({'success': False, 'errors': {'__all__': ['Invalid JSON']}}, status=400)

        form = self.form_class(data)
        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

    def form_invalid(self, form):
        return JsonResponse({'success': False, 'message': self.error_message, 'errors': form.errors}, status=400)

    def form_valid(self, form):
        try:
            form.send_email()
            return JsonResponse(
                {'success': True, 'message': self.success_message.format(name=form.cleaned_data.get("name"))})
        except Exception as e:
            return JsonResponse({'success': False, 'message': self.error_message, 'errors': {'__all__': [str(e)]}},
                                status=500)
