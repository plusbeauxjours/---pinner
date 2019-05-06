from django.db import models
from django.contrib.auth.models import User
from config import models as config_models
from django.contrib.humanize.templatetags.humanize import naturaltime

from locations import models as location_models

from django.db.models.signals import pre_save, pre_init
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from django.utils import timezone
import datetime


class Coffee (config_models.TimeStampedModel):

    TARGETS = (
        ('everyone', 'EVERYONE'),
        ('gender', 'GENDER'),
        ('nationality', 'NATIONALITY'),
        ('followers', 'FOLLOWERS'),
    )

    city = models.ForeignKey(location_models.City, on_delete=models.CASCADE, related_name='coffee')
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='coffee')
    duration = models.DurationField(default=datetime.timedelta(days=1))
    expires = models.DateTimeField(blank=True, null=True)
    target = models.CharField(max_length=11, choices=TARGETS, default='everyone')

    # caption = models.TextField(blank=True, null=True)

    @property
    def status(self):
        if self.created_at + self.duration <= timezone.now():
            return 'expired'
        else:
            return 'requesting'

    @property
    def natural_time(self):
        return naturaltime(self.expires)

    def format(self):
        from django.utils.timesince import timesince
        return timesince(self.fecha)


@receiver(pre_save, sender=Coffee)
def get_expries(sender, **kwargs):
    instance = kwargs.pop('instance')
    instance.expires = timezone.now() + instance.duration


class Match (config_models.TimeStampedModel):

    STATUS = (
        ('ongoing', 'ONGOING'),
        ('canceled', 'CANCELED'),
    )

    coffee = models.ForeignKey(Coffee, on_delete=models.PROTECT, null=True, blank=True, related_name='match')
    city = models.ForeignKey(location_models.City, on_delete=models.CASCADE, null=True, blank=True)
    host = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='host')
    guest = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='guest')
    status = models.CharField(max_length=10, choices=STATUS, default='ongoing')

    @cached_property
    def country_count(self):
        return self.countries.all().count()

    @property
    def natural_time(self):
        return naturaltime(self.created_at)
