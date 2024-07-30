from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Workout, UserExercise 

class WorkoutSerializer(serializers.ModelSerializer):
  class Meta:
    model = Workout
    fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'password']
    extra_kwargs = {"password": {"write_only": True}}

  def create(self, validated_data):
    # print(validated_data)
    user = User.objects.create_user(**validated_data)
    return user

class UserExerciseSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserExercise
    fields = '__all__'
    extra_kwargs = {'user': {'read_only': True}}