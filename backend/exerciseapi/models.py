from django.db import models

class Exercise(models.Model):
  class TypeChoices(models.TextChoices):
    CARDIO = 'cardio'
    STRENGTH = 'strength'
    FLEXIBILITY = 'flexibililty'

  class MuscleChoices(models.TextChoices):
    ABDOMINALS = 'abdominals'
    BICEPS =  'biceps',
    CALVES =  'calves',
    CARDIO = 'cardio',
    CHEST = 'chest',
    FOREARMS =  'forearms',
    HAMSTRINGS =  'hamstrings',
    MIDDLE_BACK =  "middle_back",
    LATS =  'lats',
    QUADS =  'quads',
    SHOULDERS = 'shoulders',
    TRICEPS = 'triceps',
    TRAPS =  'traps',

  class EquipmentChoices(models.TextChoices):
    BARBELL = 'barbell'
    BODY = 'body'
    DUMBBELLS = 'dumbbells'
    MACHINE = 'machine'
    OTHER = 'other'
    RESISTANCE_BAND = 'resistance_band'
    TREADMILL = 'treadmill'

  name = models.CharField(max_length=50)
  type = models.CharField(max_length=50, choices=TypeChoices.choices)
  muscle = models.CharField(max_length=50, choices=MuscleChoices.choices)
  equipment = models.CharField(max_length=50, choices=EquipmentChoices.choices)
  instructions = models.CharField(max_length=500)

  def __str__(self):
    return self.name
