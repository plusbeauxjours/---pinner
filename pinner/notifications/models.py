from django.db import models
from django.contrib.auth.models import User
from django.contrib.humanize.templatetags.humanize import naturaltime

from cards import models as card_models
from locations import models as location_models
from users import models as user_models

from config import models as config_models


class Notification(config_models.TimeStampedModel):

    VERBS = (
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('follow', 'Follow'),
        ('move', 'Move'),
        ('upload', 'Upload')
    )

    actor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notification')
    target = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name='target')
    verb = models.CharField(max_length=10, choices=VERBS)
    payload = models.ForeignKey(
        card_models.Card, on_delete=models.CASCADE, null=True, blank=True)
    read = models.BooleanField(default=False)
    comment = models.ForeignKey(
        card_models.Comment, on_delete=models.CASCADE, null=True, blank=True)

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return '{} / From: {} {} 👉🏻 To:  Read:{}'.format(
            self.id,
            self.actor.username,
            self.verb,
            self.read
        )


class MoveNotification(config_models.TimeStampedModel):

    VERBS = (
        ('move', 'Move'),
    )

    actor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='movenotification')
    verb = models.CharField(max_length=10, choices=VERBS, default='move')
    from_city = models.ForeignKey(
        location_models.City, on_delete=models.CASCADE, null=True, blank=True, related_name='fromCity')
    to_city = models.ForeignKey(
        location_models.City, on_delete=models.CASCADE, null=True, blank=True, related_name='toCity')
    from_date = models.DateTimeField(null=True, blank=True)
    to_date = models.DateTimeField(null=True, blank=True)
    read = models.BooleanField(default=False)

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    class Meta:
        ordering = ['-created_at']
