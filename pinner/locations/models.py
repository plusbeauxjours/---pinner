from django.db import models
from django.contrib.auth.models import User
from django.contrib.humanize.templatetags.humanize import naturaltime
from config import models as config_models


class Continent (config_models.TimeStampedModel):

    continent_name = models.CharField(max_length=20, null=True, blank=True)
    continent_photo = models.URLField(null=True, blank=True)

    @property
    def country_count(self):
        return self.countries.all().count()

    def __str__(self):
        return self.continent_name


class Country (config_models.TimeStampedModel):

    country_name = models.CharField(max_length=50, null=True, blank=True)
    country_code = models.CharField(max_length=2, null=True, blank=True)
    country_photo = models.URLField(null=True, blank=True)
    continent = models.ForeignKey(Continent, null=True, blank=True, on_delete=models.CASCADE, related_name='countries')

    @property
    def city_count(self):
        return self.cities.all().count()

    @property
    def card_count(self):
        return self.cards.all().count()

    def __str__(self):
        return self.country_name


class City (config_models.TimeStampedModel):

    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, related_name='cities')
    city_name = models.CharField(max_length=50, null=True, blank=True)
    city_photo = models.URLField(null=True, blank=True)
    aqi = models.IntegerField(null=True, blank=True)
    temperature = models.IntegerField(null=True, blank=True)
    population = models.IntegerField(null=True, blank=True)
    area = models.IntegerField(null=True, blank=True)
    info = models.TextField(null=True, blank=True)
    near_city = models.ManyToManyField(
        'self',  blank=True, symmetrical=False, related_name='near_cities')
    near_country = models.ManyToManyField(
        Country,  blank=True, symmetrical=False, related_name='near_countries')

    @property
    def like_count(self):
        return self.likes.all().count()

    @property
    def card_count(self):
        return self.cards.all().count()

    @property
    def user_count(self):
        return self.currentCity.all().order_by('-user_id').distinct('user_id').count()

    @property
    def user_log_count(self):
        return self.city.all().order_by('-actor_id').distinct('actor_id').count()

    def __str__(self):
        return self.city_name


class Like(config_models.TimeStampedModel):

    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name='likes')
    city = models.ForeignKey(
        City, on_delete=models.CASCADE, null=True, related_name='likes')

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    def __str__(self):
        return 'User: {} - City cityname: {}'.format(self.creator.username, self.city.city_name)
