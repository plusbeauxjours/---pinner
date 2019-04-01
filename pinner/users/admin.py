from django.contrib import admin
from . import models


@admin.register(models.Profile)
class ProfileAdmin(admin.ModelAdmin):

    list_display = (
        'username',
        'current_city',
        'city_count',
        'trip_count',
        'country_count',
        'continent_count'
    )
