from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('myrooms', views.RoomView.as_view()),
    path('create-room', views.CreateRoom.as_view()),
    path('update-room', views.UpdateRoom.as_view()),
    path('join-room', views.JoinRoom.as_view()),
    path('get-room',views.GetRoom.as_view()),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('delete/<str:code>', views.DeleteRoom.as_view())
]