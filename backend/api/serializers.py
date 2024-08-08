from django.contrib.auth.models import User
from rest_framework import serializers
from .models import ExerciseSet, UserExercise, Workout

class ExerciseSetSerializer(serializers.ModelSerializer):
  class Meta:
    model = ExerciseSet 
    fields = '__all__'

class UserExerciseSerializer(serializers.ModelSerializer):
  exercise_sets = ExerciseSetSerializer(many=True)

  class Meta:
    model = UserExercise
    fields = '__all__'

class WorkoutSerializer(serializers.ModelSerializer):
  user_exercises = UserExerciseSerializer(many=True)

  class Meta:
    model = Workout
    fields = '__all__'
    extra_kwargs = {'user': {'read_only': True}}

  def create(self, validated_data):
    user_exercises_data = validated_data.pop('user_exercises', []) # get and remove exercise data
    workout = Workout.objects.create(**validated_data) # create new Workout instance with valid Workout data (UserExercise and Workout are now separated)

    # for every exercise
    for user_exercise in user_exercises_data:
      # get exercise set data from this exercise
      exercise_set_data = user_exercise.pop('exercise_sets', [])

      # create a new exercise instance for this workout
      user_exercise = UserExercise.objects.create(**user_exercise, workout=workout)

      # for every set
      for exercise_set in exercise_set_data:
        # create a new set instance for this exercise
        ExerciseSet.objects.create(**exercise_set, user_exercise=user_exercise)

    return(workout)

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'password']
    extra_kwargs = {"password": {"write_only": True}}

  def create(self, validated_data):
    # print(validated_data)
    user = User.objects.create_user(**validated_data)
    return user