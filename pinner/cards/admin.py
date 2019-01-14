from django.contrib import admin
from . import models

@admin.register(models.Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = (
        'city',
    )

@admin.register(models.Card)
class CardAdmin(admin.ModelAdmin):

    list_display_links = (
        'location',
    )

    search_fields = (
        'location',
        'caption',
    )

    list_filter = (
        'location',
        'creator',
    )

    list_display = (
        'id',
        'location',
        'creator',
        'caption',
        'created_at',
        'updated_at',
    )

@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):

    list_display = (
        'creator',
        'card',
        'created_at',
        'updated_at',
    )

@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'message',
        'creator',
        'card',
        'created_at',
        'updated_at',
    )