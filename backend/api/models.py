from django.db import models
from django.contrib.auth.models import User

class Workout(models.Model):
  workout_name = models.CharField(max_length=50, null=True, blank=True)
  date = models.DateField(auto_now_add=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE)

  @property
  def user_exercises(self):
    return self.userexercise_set.all()

  def __str__(self):
    workout_name = self.workout_name or "Workout" 
    num_exercises = self.userexercise_set.all().count()
    return f"{self.user.username} - {workout_name} on {self.date} - {num_exercises} exercises"

class UserExercise(models.Model):
  exercise_name = models.CharField(max_length=50)
  workout = models.ForeignKey(Workout, on_delete=models.CASCADE, null=True)

  @property
  def exercise_sets(self):
    return self.exerciseset_set.all()

  def __str__(self):
    return f"{self.workout.user.username} - {self.exercise_name}"

class ExerciseSet(models.Model):
  set_number = models.PositiveIntegerField()
  weight = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
  reps = models.PositiveIntegerField()
  user_exercise = models.ForeignKey(UserExercise, on_delete=models.CASCADE, null=True) 

  def __str__(self):
    return f"Set {self.set_number} - {self.user_exercise} for {self.reps} reps at {self.weight} kgs" 