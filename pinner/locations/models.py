from django.db import models
from django.contrib.auth.models import User
from django.contrib.humanize.templatetags.humanize import naturaltime
from config import models as config_models


class Country (config_models.TimeStampedModel):

    countryname = models.CharField(max_length=100, null=True, blank=True)
    countrycode = models.CharField(max_length=2, null=True, blank=True)

    @property
    def city_count(self):
        return self.cities.all().count()

    def __str__(self):
        return self.countryname


class City (config_models.TimeStampedModel):

    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, related_name='cities')
    cityname = models.CharField(max_length=100, null=True, blank=True)

    @property
    def like_count(self):
        return self.likes.all().count()

    def __str__(self):
        return self.cityname


class Like(config_models.TimeStampedModel):

    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name='likes')
    city = models.ForeignKey(
        City, on_delete=models.CASCADE, null=True, related_name='likes')

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    def __str__(self):
        return 'User: {} - City cityname: {}'.format(self.creator.username, self.city.cityname)


class LocationLog(config_models.TimeStampedModel):

    creator = models.ForeignKey(
        User,  on_delete=models.CASCADE, null=True, related_name='locationlogs')
    city = models.ForeignKey(
        City, on_delete=models.CASCADE, null=True, related_name='locationlogs')
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, null=True, related_name='locationlogs')

    def natural_time(self):
        return naturaltime(self.created_at)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return '{} / Creator: {} / {},{} / CreatedAt: {}'.format(
            self.id,
            self.creator.username,
            self.city.cityname,
            self.country.countryname,
            self.created_at
        )
