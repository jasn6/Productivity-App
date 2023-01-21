from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from rest_framework.permissions import AllowAny
from .models import NewUser
from rest_framework_simplejwt.tokens import RefreshToken

class CustomUserCreate(APIView):
    permission_classes = [AllowAny]
    serializer_class = CustomUserSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data.get("user_name")
            queryset = NewUser.objects.filter(user_name=user)
            if queryset.exists():
              return Response({'Error': 'Username Already Exists'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer.save()
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlacklistToken(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)