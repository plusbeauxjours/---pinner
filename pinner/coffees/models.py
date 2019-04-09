from django.db import models
from django.contrib.auth.models import User
from config import models as config_models

from locations import models as location_models


class Coffee (config_models.TimeStampedModel):

    STATUS = (
        ('requesting', 'REQUESTING'),
        ('ongoing', 'ONGOING'),
        ('accepted', 'ACCEPTED'),
        ('finished', 'FINISHED'),
        ('refused', 'REFUSED'),
        ('canceled', 'CANCELED'),
    )

    city = models.ForeignKey(location_models.City, on_delete=models.CASCADE, null=True, blank=True)
    host = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    duration = models.DurationField(default="24:00:00")
    status = models.CharField(max_length=10, choices=STATUS)

    def __str__(self):
        return self.duration


class Match (config_models.TimeStampedModel):

    STATUS = (
        ('canceled', 'CANCELED'),
    )

    city = models.ForeignKey(location_models.City, on_delete=models.CASCADE, null=True, blank=True)
    host = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='host')
    guest = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='guest')
    status = models.CharField(max_length=10, choices=STATUS)

    @property
    def country_count(self):
        return self.countries.all().count()

    def __str__(self):
        return self.continent_name
