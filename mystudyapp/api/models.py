from django.db import models
import string
import random
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.
def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code

class Room(models.Model):
    code = models.CharField(
        max_length=8, default=generate_unique_code, unique=True)
    host = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    capacity = models.IntegerField(default=1)
    theme = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    
    name = models.CharField(max_length=200, default='Room')
