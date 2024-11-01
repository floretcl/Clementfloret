from django.urls import path

from .views import (
    IndexView,
    PortfolioView,
    PortfolioLinksView,
    PortfolioSkillsView,
    ProjectTypesView,
    ProjectsView,
    ProjectView,
    ContactView
)

app_name = 'portfolio'
urlpatterns = [
    path(r'^.*$', IndexView.as_view(), name='index'),
    path('api/portfolio', PortfolioView.as_view(), name='about'),
    path('api/portfolio_links', PortfolioLinksView.as_view(), name='portfolio-links'),
    path('api/portfolio_skills', PortfolioSkillsView.as_view(), name='portfolio-skills'),
    path('api/project_types', ProjectTypesView.as_view(), name='project-types'),
    path('api/projects', ProjectsView.as_view(), name='projects'),
    path('api/project', ProjectView.as_view(), name='project'),
    path('api/contact', ContactView.as_view(), name='contact'),
]
