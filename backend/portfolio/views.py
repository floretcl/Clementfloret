from django.core import serializers
from django.contrib import messages
from django.views.generic import TemplateView, DetailView, FormView, ListView

from portfolio.forms import ContactForm
from portfolio.models import Portfolio, PortfolioLink, ProjectType, Project, ProjectLink, ProjectImage, Icon, Skill


class IndexView(TemplateView):
    template_name = 'portfolio/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        portfolio = Portfolio.objects.filter(active=True).first()
        about_links = PortfolioLink.objects.filter(portfolio=portfolio).order_by('order')

        portfolio_data = {
            "id": portfolio.pk,
            "name": portfolio.name,
            "name_fr": portfolio.name_fr,
            "firstname": portfolio.firstname,
            "lastname": portfolio.lastname,
            "job_title": portfolio.job_title,
            "job_title_fr": portfolio.job_title_fr,
            "contact_email": portfolio.contact_email,
            "resume": portfolio.resume.url,
        }
        about_links_data = [
            {
                "id": link.pk,
                "name": link.name,
                "icon": link.icon.svg_file.url if link.icon else None,
                "link": link.link,
            }
            for link in about_links
        ]
        context['portfolio'] = portfolio_data
        context['about_links'] = about_links_data
        return context


class AboutView(TemplateView):
    template_name = 'portfolio/about.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        portfolio = Portfolio.objects.filter(active=True).first()
        about_skills = Skill.objects.filter(portfolio=portfolio).order_by('order')
        about_links = PortfolioLink.objects.filter(portfolio=portfolio).order_by('order')

        portfolio_data = {
            "pk": portfolio.pk,
            "name": portfolio.name,
            "name_fr": portfolio.name_fr,
            "firstname": portfolio.firstname,
            "lastname": portfolio.lastname,
            "contact_email": portfolio.contact_email,
            "avatar": portfolio.avatar.url,
            "about_description": portfolio.about_description,
            "about_description_fr": portfolio.about_description_fr,
            "about_skill": list(portfolio.about_skill.values_list("id", flat=True)),
        }
        about_skills_data = [
            {
                "id": skill.pk,
                "name": skill.name,
                "icon": skill.icon.svg_file.url if skill.icon else None,
            }
            for skill in about_skills if skill.icon is not None
        ]
        about_links_data = [
            {
                "id": link.pk,
                "name": link.name,
                "icon": link.icon.svg_file.url if link.icon else None,
                "link": link.link,
            }
            for link in about_links
        ]
        context['portfolio'] = portfolio_data
        context['about_skills'] = about_skills_data
        context['about_links'] = about_links_data
        return context


class ProjectListView(ListView):
    template_name = 'portfolio/projects.html'
    queryset = serializers.serialize("json", Project.objects.order_by('order'))
    context_object_name = 'projects'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        portfolio = Portfolio.objects.filter(active=True).first()
        about_links = PortfolioLink.objects.filter(portfolio=portfolio).order_by('order')
        project_types = ProjectType.objects.filter(portfolio=portfolio).order_by()
        projects = Project.objects.filter(portfolio=portfolio).order_by('order')

        portfolio_data = {
            "id": portfolio.pk,
            "firstname": portfolio.firstname,
            "lastname": portfolio.lastname,
            "contact_email": portfolio.contact_email,
        }
        about_links_data = [
            {
                "id": link.pk,
                "name": link.name,
                "icon": link.icon.svg_file.url if link.icon else None,
                "link": link.link,
            }
            for link in about_links
        ]
        project_types_data = [
            {
                "id": project_type.pk,
                "name": project_type.name,
                "name_fr": project_type.name_fr,
            }
            for project_type in project_types
        ]
        projects_data = [
            {
                "id": project.pk,
                "name": project.name,
                "name_fr": project.name_fr,
                "project_type": project.project_type.name,
            }
            for project in projects
        ]
        context['portfolio'] = portfolio_data
        context['about_links'] = about_links_data
        context['project_types'] = project_types_data
        context['projects'] = projects_data
        return context


class ProjectDetailView(DetailView):
    template_name = 'portfolio/project.html'
    model = Project

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        portfolio = Portfolio.objects.filter(active=True).first()
        about_links = PortfolioLink.objects.filter(portfolio=portfolio).order_by('order')
        project = self.object
        project_images = ProjectImage.objects.filter(project=project).order_by()
        project_links = ProjectLink.objects.filter(project=project).order_by('order')

        portfolio_data = {
            "id": portfolio.pk,
            "firstname": portfolio.firstname,
            "lastname": portfolio.lastname,
            "contact_email": portfolio.contact_email,
        }
        about_links_data = [
            {
                "id": link.pk,
                "name": link.name,
                "icon": link.icon.svg_file.url if link.icon else None,
                "link": link.link,
            }
            for link in about_links
        ]
        project_data = {
            "id": project.pk,
            "name": project.name,
            "name_fr": project.name_fr,
            "description": project.description,
            "description_fr": project.description_fr,
            "skills": list(project.skill.values_list("id", "name").order_by("order")),
            "type": project.project_type.name,
        }
        project_images = [
            {
                "id": image.pk,
                "name": image.name,
                "image": image.image.url
            }
            for image in project_images
        ]
        project_links = [
            {
                "id": link.pk,
                "name": link.name,
                "icon": link.icon.svg_file.url if link.icon else None,
            }
            for link in project_links
        ]
        context['portfolio'] = portfolio_data
        context['about_links'] = about_links_data
        context['project'] = project_data
        context['project_images'] = project_images
        context['project_links'] = project_links
        return context


class ContactView(FormView):
    template_name = 'portfolio/contact.html'
    form_class = ContactForm
    success_url = '/'
    success_message = 'Tank you {name}. Your message has been sent.'
    error_message = 'Your message could not be sent.'

    def form_invalid(self, form):
        super().form_invalid(form)
        messages.error(self.request, self.error_message)

    def form_valid(self, form):
        form.send_email()
        messages.success(self.request, self.success_message.format(name=form.cleaned_data.get("name")))
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        portfolio = Portfolio.objects.filter(active=True).first()
        about_links = PortfolioLink.objects.filter(portfolio=portfolio).order_by('order')

        portfolio_data = {
            "model": portfolio._meta.label_lower,
            "pk": portfolio.pk,
            "name": portfolio.name,
            "name_fr": portfolio.name_fr,
            "firstname": portfolio.firstname,
            "lastname": portfolio.lastname,
            "contact_email": portfolio.contact_email,
            "about_link": list(portfolio.about_link.values_list("id", flat=True)),
        }
        about_links_data = [
            {
                "model": link._meta.label_lower,
                "id": link.pk,
                "name": link.name,
                "icon": link.icon.svg_file.url if link.icon else None,
                "link": link.link,
            }
            for link in about_links
        ]
        context['portfolio'] = portfolio_data
        context['about_links'] = about_links_data
        return context
