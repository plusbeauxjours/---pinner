from django.contrib import admin
from . import models


@admin.register(models.Continent)
class ContinentAdmin(admin.ModelAdmin):
    list_display = (
        'continent_name',
        'continent_photo',
        'country_count',
    )


@admin.register(models.Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = (
        'country_name',
        'continent',
        'country_photo',
        'total_like_count',
        'city_count',
        'country_capital',
        'country_name_native',
        'country_phone',
        'country_emoji',
        'country_emojiU',
    )


@admin.register(models.City)
class CityAdmin(admin.ModelAdmin):
    list_display = (
        'city_name',
        'city_id',
        'id',
        'latitude',
        'longitude',
        'country',
        'like_count',
        'user_count',
        'user_log_count',
        'city_photo',
        'population',
    )


@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = (
        'creator',
        'city',
        'natural_time',
    )
