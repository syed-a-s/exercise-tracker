# Generated by Django 5.0.7 on 2024-07-31 15:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_rename_set_exerciseset'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userexercise',
            name='workout',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_exercises', to='api.workout'),
        ),
    ]
