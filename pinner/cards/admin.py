from django.contrib import admin
from . import models


@admin.register(models.Card)
class CardAdmin(admin.ModelAdmin):

    search_fields = (
        'city__city_name',
        'caption',
    )

    list_filter = (
        'city',
        'creator',
    )

    list_display = (
        'id',
        'city',
        'creator',
        'caption',
        'created_at',
        'like_count'
    )


@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):

    list_display = (
        'creator',
        'id',
        'card',
    )


@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        'creator',
        'id',
        'card',
        'message',
        'like_count'
    )



@admin.register(models.LikeComment)
class LikeCommentAdmin(admin.ModelAdmin):
    list_display = (
        'creator',
        'id',
        'comment',
    )
