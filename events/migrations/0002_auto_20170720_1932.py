# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-20 19:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bid',
            name='bid_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='event_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]