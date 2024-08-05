from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.UserExercise)
admin.site.register(models.Workout)
admin.site.register(models.ExerciseSet)