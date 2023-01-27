from django.shortcuts import render
from rest_framework import generics, status
from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer, UpdateRoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class RoomView(generics.ListAPIView):
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            user = self.request.user
            return user.room_set.all()
        else:
            return Room.objects.none()

    def get(self, request, format=None):
        rooms = self.get_queryset()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)

class CreateRoom(APIView):
    serializer_class = CreateRoomSerializer
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        user = request.user
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            theme = serializer.data.get('theme')
            capacity = serializer.data.get('capacity')
            name = serializer.data.get("name")
            room = Room(theme=theme,
                        capacity=capacity, host=user, name=name)
            room.save()

        return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code = code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found:' 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND) 
        return Response({'Bad Request:' 'Code paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST) 
        

class JoinRoom(APIView):
    lookup_url_kwarg='code'
    def post(self, request, format=None):
        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(code = code)
            if len(room_result) > 0:
                room = room_result[0]
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)
            else:
                return Response({'Bad Request:' 'Invalid Room Code'},status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status = status.HTTP_400_BAD_REQUEST)

class UpdateRoom(APIView):
    serializer_class = UpdateRoomSerializer
    def patch(self,request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            capacity = serializer.data.get('capacity')
            theme = serializer.data.get('theme')
            name = serializer.data.get('name')
            code = serializer.data.get('code')
            queryset = Room.objects.filter(code=code)
            if queryset.exists():
                room = queryset[0]
                room.capacity = capacity
                room.theme = theme
                room.name = name
                room.save(update_fields=['capacity', 'theme','name'])
                return Response(RoomSerializer(room).data,status=status.HTTP_200_OK)
            return Response({'Message':'Room not found'},status=status.HTTP_404_NOT_FOUND)
        return Response({'Message': 'Data is not valid'}, status = status.HTTP_400_BAD_REQUEST)

            