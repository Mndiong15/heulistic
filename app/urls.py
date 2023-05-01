from django.urls import path
from django.views.generic import TemplateView
from . import views

# URL Configuration
urlpatterns = [
    path('', TemplateView.as_view(template_name="index.html")),
    path('about/', views.about, name='about'),
    path('pricing/', views.pricing, name='pricing'),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh')
]