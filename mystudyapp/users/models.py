from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.
class CustomAccountManager(BaseUserManager):
    def create_superuser(self, user_name, password, **other_fields):

        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_staff', True)

        return self.create_user(user_name, password, **other_fields)

    def create_user(self, user_name, password, **other_fields):
        user = self.model(user_name=user_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class NewUser(AbstractBaseUser, PermissionsMixin):
    user_name = models.CharField(max_length=150, unique=True)
    created_on = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    objects = CustomAccountManager()

    USERNAME_FIELD = 'user_name'

    def __str__(self):
        return self.user_name