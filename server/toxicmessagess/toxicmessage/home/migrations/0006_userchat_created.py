# Generated by Django 5.0.4 on 2024-04-21 08:25

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_remove_group_member_name_groupmembers'),
    ]

    operations = [
        migrations.AddField(
            model_name='userchat',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
