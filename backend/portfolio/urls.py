from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, re_path, include

from .views import (
    IndexView,
    PortfolioView,
    PortfolioLinksView,
    PortfolioSkillsView,
    ProjectTypesView,
    ProjectsView,
    ProjectView,
    ContactView,
    RobotsTxtView
)

app_name = 'portfolio'

urlpatterns = [
    path('api/portfolio', PortfolioView.as_view(), name='about'),
    path('api/portfolio_links', PortfolioLinksView.as_view(), name='portfolio-links'),
    path('api/portfolio_skills', PortfolioSkillsView.as_view(), name='portfolio-skills'),
    path('api/project_types', ProjectTypesView.as_view(), name='project-types'),
    path('api/projects', ProjectsView.as_view(), name='projects'),
    path('api/project', ProjectView.as_view(), name='project'),
    path('api/contact', ContactView.as_view(), name='contact'),
    path('robots.txt', RobotsTxtView.as_view(content_type="text/plain"), name="robots"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    re_path(r'^.*$', IndexView.as_view(), name='index'),
    path('i18n/', include('django.conf.urls.i18n')),
]
