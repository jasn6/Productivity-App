# Generated by Django 4.1.4 on 2023-01-25 23:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_room_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='name',
            field=models.CharField(default='Room', max_length=255),
        ),
    ]