from django.contrib import admin
from . import models


@admin.register(models.Notification)
class NotificationAdmin(admin.ModelAdmin):
    pass


@admin.register(models.MoveNotification)
class MoveNotificationAdmin(admin.ModelAdmin):
    pass
