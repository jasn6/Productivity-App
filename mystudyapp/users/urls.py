from django.urls import path
from . import views

urlpatterns = [
    path('register', views.CustomUserCreate.as_view()),
    path('logout/blacklist', views.BlacklistToken.as_view())
]
