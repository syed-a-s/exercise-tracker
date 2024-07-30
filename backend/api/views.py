from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, WorkoutSerializer 
from .models import Workout 

# create user's workouts
class WorkoutListCreate(generics.ListCreateAPIView):
  serializer_class = WorkoutSerializer
  permission_classes = [IsAuthenticated]

  # override get_queryset to return fields filtered with current user
  def get_queryset(self):
    user = self.request.user
    return Workout.objects.filter(user=user)

  # override default get method
  def get(self, request, *args, **kwargs):
    queryset = self.get_queryset()
    serializer = self.get_serializer(queryset, many=True)
    return Response({"workouts": serializer.data}, status=status.HTTP_200_OK)

  # override create method to only create an exercise for current user
  def perform_create(self, serializer):
    if serializer.is_valid():
      serializer.save(user=self.request.user)
    else:
      print(serializer.errors)

class WorkoutDelete(generics.DestroyAPIView):
  serializer_class = WorkoutSerializer 
  permission_classes = [IsAuthenticated]

  # override get_queryset to return fields filtered with current user
  def get_queryset(self):
    user = self.request.user
    return Workout.objects.filter(user=user)

class CreateUserView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]