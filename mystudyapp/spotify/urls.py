from django.urls import path
from . import views
urlpatterns = [
    path('get-auth-url', views.AuthUrl.as_view()),


]