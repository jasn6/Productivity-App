from django.contrib import admin
from users.models import NewUser

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)


admin.site.register(NewUser,UserAdmin)