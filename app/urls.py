from django.urls import path
from django.views.generic import TemplateView
from . import views

# URL Configuration
urlpatterns = [
    path('', TemplateView.as_view(template_name="index.html")),
    path('about/', views.about, name='about')
]