from django.urls import path

from .views import IndexView, AboutView, ContactView, ProjectListView, ProjectDetailView

app_name = 'portfolio'
urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('about/', AboutView.as_view(), name='about'),
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('project/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    path('contact/', ContactView.as_view(), name='contact'),
]
