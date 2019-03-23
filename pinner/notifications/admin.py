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
        'verb',
        'read'
    )


@admin.register(models.MoveNotification)
class MoveNotificationAdmin(admin.ModelAdmin):

    search_fields = (
        'actor__username',
    )

    list_display = (
        'id',
        'actor',
        'from_city',
        'to_city',
        'read',
    )
