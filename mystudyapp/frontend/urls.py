from django.urls import path
from .views import home

urlpatterns = [
    path('', home),
    path('register',home),
    path('create-room',home),
    path('rooms',home),
    path('login',home),
    path('logout', home),

]