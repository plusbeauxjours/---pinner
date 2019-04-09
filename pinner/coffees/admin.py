from django.contrib import admin
from . import models


@admin.register(models.Coffee)
class CoffeeAdmin(admin.ModelAdmin):

    list_display = (
        'city',
        'host',
        'duration',
        'status',
    )


@admin.register(models.Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = (
        'city',
        'host',
        'guest',
        'status',
    )
