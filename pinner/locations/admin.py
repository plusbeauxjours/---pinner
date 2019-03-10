from django.contrib import admin
from . import models


@admin.register(models.Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = (
        'country_name',
        'city_count',
        'user_count',
        'user_log_count'
    )


@admin.register(models.City)
class CityAdmin(admin.ModelAdmin):
    list_display = (
        'city_name',
        'like_count',
        'user_count',
        'user_log_count'
    )


@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    pass
