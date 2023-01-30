from django.shortcuts import render
from .credentials import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response

# Create your views here.
class AuthUrl(APIView):
  def get(self,request, format=None):
    scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
    url = Request('GET', 'https://accounts.spotify.com/authorize', params ={
      'client_id': CLIENT_ID,
      'response_ type': 'code',
      'redirect_uri': REDIRECT_URI,
      'scope': scopes
    }).prepare.url

    return Response({'url': url}, status=status.HTTP_200_OK)


