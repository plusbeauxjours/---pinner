from django.contrib import admin
from . import models


@admin.register(models.Profile)
class ProfileAdmin(admin.ModelAdmin):

    list_display = (
        'user',
        'current_city',
        'current_country',
        'city_count',
        'country_count'
    )
