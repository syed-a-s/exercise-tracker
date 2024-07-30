from django.db import models
from django.contrib.auth.models import User

class Workout(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="workouts")
  date = models.DateField(auto_now_add=True)

  def __str__(self):
    return f"{self.user.username}'s workout on {self.date}"

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