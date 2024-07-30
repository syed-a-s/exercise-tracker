from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Exercise
from .serializers import ExerciseSerializer

class ExerciseList(generics.ListAPIView):
  queryset = Exercise.objects.all()
  serializer_class = ExerciseSerializer
  permission_classes = [AllowAny]

  # overriding generics get function
  def get(self, request, *args, **kwargs):
    # fetch query parameters
    type = request.GET.get('type')
    muscle = request.GET.get('muscle')
    equipment = request.GET.get('equipment')

    # get all results from db 
    queryset = self.get_queryset()

    # filter by type
    if type: 
      queryset = queryset.filter(type=type)

    # filter by muscle
    if muscle: 
      queryset = queryset.filter(muscle=muscle)

    # filter by equipment
    if equipment:
      queryset = queryset.filter(equipment=equipment)

    # get serialized data from filtered queryset
    serializer = self.get_serializer(queryset, many=True) 

    # return response with data and 200 status
    return Response({"exercises": serializer.data}, status=status.HTTP_200_OK)