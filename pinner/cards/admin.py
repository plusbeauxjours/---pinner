from django.contrib import admin
from . import models


@admin.register(models.Card)
class CardAdmin(admin.ModelAdmin):

    search_fields = (
        'country',
        'city',
        'caption',
    )

    list_filter = (
        'country',
        'city',
        'creator',
    )

    list_display = (
        'id',
        'country',
        'city',
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
