from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Group(models.Model):
    group_name = models.CharField(max_length=100) 
    admin = models.ForeignKey(User,on_delete=models.CASCADE,default=5)

    def __str__(self):
        return self.group_name

class GroupMembers(models.Model):
    member= models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    def __str__(self):
        return self.group.group_name
    
class Userchat(models.Model):
    name = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=100)
    group_name = models.ForeignKey(Group, on_delete=models.CASCADE , default=0)
    created = models.DateTimeField(auto_now_add=True)
    is_toxic = models.IntegerField(default=0)


    def __str__(self):
        return self.message