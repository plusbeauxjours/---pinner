from django.contrib import admin
from . import models


@admin.register(models.Coffee)
class CoffeeAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'city',
        'host',
        'match_count',
        'status',
        'target',
        # 'rest_time'
    )


@admin.register(models.Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'city',
        'host',
        'guest',
    )
