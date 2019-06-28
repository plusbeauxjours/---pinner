from django.contrib import admin
from . import models


@admin.register(models.Profile)
class ProfileAdmin(admin.ModelAdmin):

    list_display = (
        'username',
        'avatar',
        'current_city',
        'city_count',
        'trip_count',
        'country_count',
        'continent_count',
        'nationality',
        'residence',
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
