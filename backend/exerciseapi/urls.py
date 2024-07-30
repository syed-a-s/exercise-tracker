from django.urls import path
from . import views

urlpatterns = [
  path('', views.ExerciseList.as_view(), name="exercise-view-create"),
]