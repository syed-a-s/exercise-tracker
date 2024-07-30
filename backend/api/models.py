from django.db import models
from django.contrib.auth.models import User

class Workout(models.Model):
  workout_name = models.CharField(max_length=50, null=True)
  date = models.DateField(auto_now_add=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="workouts")

  # TO DO: implement create method to take a request with JSON with Workout and it's exercises and sets
  # def create(self, validated_data):
  #   exercises_data = validated_data.pop('exercises', [])

  def __str__(self):
    workout_name = self.workout_name or "Workout" 
    num_exercises = self.exercises.all().count()
    return f"{self.user.username} - {workout_name} on {self.date} - {num_exercises} exercises"

class UserExercise(models.Model):
  exercise = models.CharField(max_length=50)
  workout = models.ForeignKey(Workout, on_delete=models.CASCADE, null=True, related_name="exercises")

  def __str__(self):
    return f"{self.workout.user.username} - {self.exercise}"

class Set(models.Model):
  set_number = models.PositiveIntegerField()
  reps = models.PositiveIntegerField()
  weight = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
  user_exercise = models.ForeignKey(UserExercise, on_delete=models.CASCADE, null=True, related_name="sets") 

  def __str__(self):
    return f"Set {self.set_number} - {self.user_exercise} for {self.reps} reps at {self.weight} kgs" 