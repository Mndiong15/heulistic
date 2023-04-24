from django.urls import path
from django.views.generic import TemplateView
from django.
from . import views

# URL Configuration
urlpatterns = [
    path('', TemplateView.as_view(template_name="index.html"))
    path('About Us/', TemplateView.as_view(template_name="About.js"))
]
