from django.contrib import admin
from . import models


@admin.register(models.Profile)
class ProfileAdmin(admin.ModelAdmin):

    list_display = (
        'username',
        'gender',
        'phone_number',
        'is_dark_mode',
        'is_hide_trips',
        'is_hide_coffees',
        'is_hide_cities',
        'is_hide_countries',
        'is_hide_continents',
        'is_auto_location_report',
        'current_city',
        'city_count',
        'trip_count',
        'country_count',
        'continent_count',
        'nationality',
        'residence',
        'is_verified_phone_number',
        'is_verified_email_address',
    )


@admin.register(models.Avatar)
class AvatarAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'uuid',
        'creator',
        'is_main',
        'is_default',
        'image',
        'thumbnail',
    )


@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):

    list_display = (
        'creator',
        'avatar',
    )
