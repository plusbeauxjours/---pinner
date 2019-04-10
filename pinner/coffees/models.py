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

    STATUS = (
        ('requesting', 'REQUESTING'),
        ('accepted', 'ACCEPTED'),
        ('canceled', 'CANCELED'),
        ('expired', 'EXPIRED'),
        ('refused', 'REFUSED'),
    )

    TARGET = (
        ('everyone', 'EVERYONE'),
        ('gender', 'GENDER'),
        ('nationality', 'NATIONALITY'),
        ('followers', 'FOLLOWERS'),
    )

    city = models.ForeignKey(location_models.City, on_delete=models.CASCADE)
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    duration = models.DurationField(default=datetime.timedelta(days=1))
    expires = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS, default='requesting')
    target = models.CharField(max_length=10, choices=TARGET, default='everyone')

    # @property
    # def rest_time(self):
    #     return self.expires - timezone.now()

    def active(self):
        if self.created_at + self.duration <= timezone.now():
            self.status = 'expired'
            return self.status
        else:
            self.status = 'requesting'
            return self.status


@receiver(pre_save, sender=Coffee)
def get_expries(sender, **kwargs):
    instance = kwargs.pop('instance')
    instance.expires = timezone.now() + instance.duration


class Match (config_models.TimeStampedModel):

    STATUS = (
        ('ongoing', 'ONGOING'),
        ('canceled', 'CANCELED'),
    )

    city = models.ForeignKey(location_models.City, on_delete=models.CASCADE, null=True, blank=True)
    host = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='host')
    guest = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='guest')
    status = models.CharField(max_length=10, choices=STATUS, default='ongoing')

    @property
    def country_count(self):
        return self.countries.all().count()

    def __str__(self):
        return self.continent_name
