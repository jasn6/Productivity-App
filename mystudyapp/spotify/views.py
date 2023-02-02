from django.shortcuts import render
from .credentials import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .utils import update_or_create_user_tokens, is_spotify_authenticated
from django.shortcuts import redirect
from users.models import NewUser

# Create your views here.
class AuthUrl(APIView):
  def get(self,request, format=None):
    scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
    url = Request('GET', 'https://accounts.spotify.com/authorize', params ={
      'client_id': CLIENT_ID,
      'response_type': 'code',
      'redirect_uri': REDIRECT_URI,
      'scope': scopes
    }).prepare().url
    request.session['user_id'] = request.user.id
    return Response({'url': url}, status=status.HTTP_200_OK)

def spotify_callback(request, format=None):
  code = request.GET.get('code')
  user_id = request.session.get('user_id')
  user = NewUser.objects.get(id=user_id)
  response = post('https://accounts.spotify.com/api/token', data={
      'client_id': CLIENT_ID,
      'client_secret': CLIENT_SECRET,
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': REDIRECT_URI,
  }).json()

  access_token = response.get('access_token')
  token_type = response.get('token_type')
  expires_in = response.get('expires_in')
  refresh_token = response.get('refresh_token')

  update_or_create_user_tokens(user, access_token, token_type, expires_in, refresh_token)

  return redirect("frontend:")

class isSpotifyAuthenticated(APIView):
  def get(self,request, format=None):
    auth, accessToken = is_spotify_authenticated(request.user)
    return Response({'status': auth, "accessToken": accessToken}, status=status.HTTP_200_OK)