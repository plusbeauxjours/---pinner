from django.contrib import admin
from . import models


@admin.register(models.Continent)
class ContinentAdmin(admin.ModelAdmin):
    list_display = (
        'continent_name',
        'continent_photo',
        'country_count',
    )

@admin.register(models.Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = (
        'language_name',
        'language_code',
        'language_native',
    )


@admin.register(models.Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = (
        'country_name',
        'continent',
        'country_photo',
        'city_count',
        'country_capital',
        'language',
        'country_name_native',
        'country_phone',
        'country_emoji',
        'country_emojiU',
    )


@admin.register(models.City)
class CityAdmin(admin.ModelAdmin):
    list_display = (
        'city_name',
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
