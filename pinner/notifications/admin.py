from django.contrib import admin
from . import models


@admin.register(models.Notification)
class NotificationAdmin(admin.ModelAdmin):

    search_fields = (
        'actor__username',
    )

    list_display = (
        'id',
        'actor',
        'target',
        'read',
        'verb',
    )


@admin.register(models.CoffeeNotification)
class CoffeeNotificationAdmin(admin.ModelAdmin):

    search_fields = (
        'host__username',
    )

    list_display = (
        'id',
        'host',
        'city',
        'target',
        'read',
        'verb'
    )


@admin.register(models.MatchNotification)
class MatchNotificationAdmin(admin.ModelAdmin):

    search_fields = (
        'host__username',
    )

    list_display = (
        'id',
        'host',
        'guest',
        'city',
        'read',
        'verb'
    )


@admin.register(models.MoveNotification)
class MoveNotificationAdmin(admin.ModelAdmin):

    search_fields = (
        'actor__username',
    )

    list_display = (
        'id',
        'actor',
        'city',
        'read',
        'start_date',
        'end_date',
        'verb'
    )
