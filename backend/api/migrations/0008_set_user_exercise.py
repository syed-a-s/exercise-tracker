# Generated by Django 5.0.7 on 2024-07-27 19:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_remove_userexercise_reps_remove_userexercise_sets'),
    ]

    operations = [
        migrations.AddField(
            model_name='set',
            name='user_exercise',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sets', to='api.userexercise'),
        ),
    ]
