from django.contrib import admin
from . import models


@admin.register(models.Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = (
        'countryname',
        'city_count',
    )


@admin.register(models.City)
class CityAdmin(admin.ModelAdmin):
    list_display = (
        'cityname',
        'like_count',
    )


@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    pass
