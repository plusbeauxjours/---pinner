from django.db import models
from django.contrib.auth.models import User
from django.contrib.humanize.templatetags.humanize import naturaltime
from datetime import timedelta
from django.db.models import Q

from cards import models as card_models
from locations import models as location_models
from users import models as user_models
from coffees import models as coffee_models
from django.core.exceptions import ValidationError

from config import models as config_models
from django.db.models.signals import pre_save
from django.dispatch import receiver


class Notification(config_models.TimeStampedModel):

    VERBS = (
        ('like', 'LIKE'),
        ('comment', 'COMMENT'),
        ('follow', 'FOLLOW'),
        ('upload', 'UPLOAD'),
    )

    actor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notification_from')
    target = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name='notification_to')
    verb = models.CharField(max_length=10, choices=VERBS)
    payload = models.ForeignKey(
        card_models.Card, on_delete=models.CASCADE, null=True, blank=True, related_name='notification')
    read = models.BooleanField(default=False)
    comment = models.ForeignKey(
        card_models.Comment, on_delete=models.CASCADE, null=True, blank=True, related_name='notification')
    coffee_target = models.CharField(max_length=20, null=True, blank=True)

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


class CoffeeNotification(config_models.TimeStampedModel):

    VERBS = (
            ('coffee', 'COFFEE'),
    )

    city = models.ForeignKey(location_models.City, on_delete=models.CASCADE, related_name='coffee_notification')
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='coffee_notification')
    verb = models.CharField(max_length=10, choices=VERBS)
    target = models.CharField(max_length=15)
    payload = models.ForeignKey(coffee_models.Coffee, on_delete=models.CASCADE,
                                null=True, blank=True, related_name='coffee_notification')
    read = models.BooleanField(default=False)

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return '{} / From: {} {} 👉🏻 To:  Read:{}'.format(
            self.id,
            self.host.username,
            self.verb,
            self.read
        )


class MatchNotification(config_models.TimeStampedModel):

    VERBS = (
            ('match', 'MATCH'),
    )

    city = models.ForeignKey(location_models.City, on_delete=models.CASCADE, related_name='match_notification')
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='match_notification_from')
    guest = models.ForeignKey(User, on_delete=models.CASCADE, related_name='match_notification_to')
    verb = models.CharField(max_length=10, choices=VERBS)
    payload = models.ForeignKey(coffee_models.Match, on_delete=models.CASCADE,
                                null=True, blank=True, related_name='match_notification')
    read = models.BooleanField(default=False)

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return '{} / From: {} {} 👉🏻 To:  Read:{}'.format(
            self.id,
            self.host.username,
            self.guest.username,
            self.verb,
            self.read
        )


class MoveNotification(config_models.TimeStampedModel):

    VERBS = (
        ('move', 'Move'),
    )

    actor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='movenotification')
    verb = models.CharField(max_length=10, choices=VERBS, default='move')
    city = models.ForeignKey(
        location_models.City, on_delete=models.CASCADE, null=True, blank=True, related_name='movenotification')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    read = models.BooleanField(default=False)

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    class Meta:
        ordering = ['-created_at']


@receiver(pre_save, sender=MoveNotification)
def clean(sender, **kwargs):
    instance = kwargs.pop('instance')
    if instance.start_date or instance.end_date:
        if MoveNotification.objects.filter(actor__id=instance.actor_id).filter(
            Q(start_date__gte=instance.start_date, start_date__lt=instance.end_date)
            | Q(end_date__gt=instance.start_date, end_date__lte=instance.end_date)
        ).exists():
            raise ValidationError("Overlapping dates")


# @receiver(pre_save, sender=MoveNotification)
# def clean_dates(sender, **kwargs):
#     instance = kwargs.pop('instance')
#     if instance.start_date > instance.end_date:
#         raise ValidationError("Trip cannot go Back")
