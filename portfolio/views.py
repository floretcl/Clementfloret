from django.contrib import messages
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView, DetailView, FormView, ListView

from portfolio.forms import ContactForm
from portfolio.models import Portfolio, PortfolioLink, ProjectType, Project


class IndexView(TemplateView):
    template_name = 'portfolio/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['portfolio'] = Portfolio.objects.filter(active=True)
        return context


class AboutView(TemplateView):
    template_name = 'portfolio/about.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['portfolio'] = Portfolio.objects.filter(active=True)
        context['portfolio_links'] = PortfolioLink.objects.order_by('order')
        return context


class ProjectListView(ListView):
    template_name = 'portfolio/project-list.html'
    queryset = Project.objects.order_by('order')
    context_object_name = 'projects'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['project_types'] = ProjectType.objects.all()
        context['portfolio_links'] = PortfolioLink.objects.order_by('order')
        return context


class TypeProjectListView(DetailView):
    template_name = 'portfolio/projects_by_type.html'
    type = None

    def get_queryset(self):
        self.type = get_object_or_404(ProjectType, name=self.kwargs['type'])
        return Project.objects.filter(type=self.type)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['project'] = self.type
        context['project_types'] = ProjectType.objects.all()
        context['portfolio_links'] = PortfolioLink.objects.order_by('order')
        return context


class ProjectDetailView(DetailView):
    template_name = 'portfolio/project-detail.html'
    model = Project
    context_object_name = 'project'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['portfolio_links'] = PortfolioLink.objects.order_by('order')
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
        context['portfolio_links'] = PortfolioLink.objects.order_by('order')
        return context
