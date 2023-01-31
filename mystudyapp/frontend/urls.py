from django.urls import path
from .views import home

app_name = "frontend"

urlpatterns = [
    path('', home, name = ''),
    path('register',home),
    path('rooms',home),
    path('login',home),
    path('logout', home),
    path('room/<str:roomCode>',home),

]