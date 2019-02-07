from django import forms
from django.contrib import admin
from . import models

@admin.register(models.Profile)
class MyUserAdmin(admin.ModelAdmin):
   pass