# Generated by Django 5.0.7 on 2024-07-25 00:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Exercise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('type', models.CharField(choices=[('cardio', 'Cardio'), ('strength', 'Strength'), ('flexibililty', 'Flexibility')], max_length=50)),
                ('muscle', models.CharField(choices=[('abdominals', 'Abdominals'), ('biceps', 'Biceps'), ('calves', 'Calves'), ('cardio', 'Cardio'), ('chest', 'Chest'), ('forearms', 'Forearms'), ('hamstrings', 'Hamstrings'), ('middle_back', 'Middle Back'), ('lats', 'Lats'), ('quads', 'Quads'), ('shoulders', 'Shoulders'), ('triceps', 'Triceps'), ('traps', 'Traps')], max_length=50)),
                ('equipment', models.CharField(choices=[('barbell', 'Barbell'), ('body', 'Body'), ('dumbbells', 'Dumbbells'), ('machine', 'Machine'), ('other', 'Other'), ('resistance_band', 'Resistance Band'), ('treadmill', 'Treadmill')], max_length=50)),
                ('instructions', models.CharField(max_length=500)),
            ],
        ),
    ]
