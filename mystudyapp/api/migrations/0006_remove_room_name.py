# Generated by Django 4.1.4 on 2023-01-25 23:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_room_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='name',
        ),
    ]
