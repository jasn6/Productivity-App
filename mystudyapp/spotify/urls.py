from django.urls import path
from . import views
urlpatterns = [
    path('get-auth-url', views.AuthUrl.as_view()),
    path('redirect',views.spotify_callback),
    path('spotify-auth', views.isSpotifyAuthenticated.as_view())
]