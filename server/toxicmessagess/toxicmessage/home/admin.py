from django.contrib import admin
from .models import Group 
from .models import Userchat
from .models import GroupMembers

# Register your models here.
admin.site.register(Group)
admin.site.register(Userchat) 
admin.site.register(GroupMembers) 