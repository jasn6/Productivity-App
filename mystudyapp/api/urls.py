from django.urls import path
from . import views

urlpatterns = [
    path('home', views.RoomView.as_view()),
    path('create-room', views.CreateRoom.as_view()),
]
