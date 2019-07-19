from django.db import models
from django.contrib.auth.models import User
from django.contrib.humanize.templatetags.humanize import naturaltime
from config import models as config_models

from cached_property import cached_property

from utils import notify_slack
from django.dispatch import receiver
from django.db.models.signals import post_save


class Continent (config_models.TimeStampedModel):

    continent_name = models.CharField(max_length=100, null=True, blank=True)
    continent_photo = models.URLField(null=True, blank=True)
    continent_code = models.CharField(max_length=20, null=True, blank=True)

    @cached_property
    def country_count(self):
        return self.countries.all().count()

    def __str__(self):
        return self.continent_name


class Country (config_models.TimeStampedModel):

    country_name = models.CharField(max_length=50, null=True, blank=True)
    country_code = models.CharField(max_length=10, null=True, blank=True)
    country_photo = models.URLField(null=True, blank=True)
    country_capital = models.CharField(max_length=50, null=True, blank=True)
    country_currency = models.CharField(max_length=20, null=True, blank=True)
    country_name_native = models.CharField(max_length=50, null=True, blank=True)
    country_phone = models.CharField(max_length=20, null=True, blank=True)
    country_emoji = models.CharField(max_length=20, null=True, blank=True)
    country_emojiU = models.CharField(max_length=20, null=True, blank=True)
    continent = models.ForeignKey(Continent, null=True, blank=True, on_delete=models.CASCADE, related_name='countries')

    @cached_property
    def city_count(self):
        return self.cities.all().count()

    @cached_property
    def total_like_count(self):
        return Like.objects.filter(city__country=self).count()

    def __str__(self):
        return self.country_name


class City (config_models.TimeStampedModel):

    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, related_name='cities')
    city_id = models.CharField(max_length=100, null=True, blank=True)
    city_name = models.CharField(max_length=100, null=True, blank=True)
    city_photo = models.URLField(null=True, blank=True)
    population = models.IntegerField(null=True, blank=True)
    info = models.TextField(null=True, blank=True)
    near_city = models.ManyToManyField(
        'self',  blank=True, symmetrical=False, related_name='near_cities')

    @cached_property
    def like_count(self):
        return self.likes.all().count()

    @cached_property
    def user_count(self):
        return self.currentCity.values('id').all().count()

    @cached_property
    def user_log_count(self):
        return self.movenotification.values('actor__id').all().order_by('-actor__id').distinct('actor__id').count()

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


@receiver(post_save, sender=City)
def send_slack_notification_city_created(sender,  instance, created, **kwargs):
    if created:
        to_channel = "#location_%s" % (instance.country.continent.continent_code.lower())
        message = "Created new city %s on %s %s. \n Total cities on %s %s: %s. \n CityPhoto link: %s " % (
            instance.city_name, instance.country.country_name, instance.country.country_emoji, instance.country.country_name, instance.country.country_emoji, instance.country.city_count, instance.city_photo)
        attachments = [{
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#569934",
            "pretext": "Optional text that appears above the attachment block",
            "author_name": "Bobby Tables",
            "author_link": "http://flickr.com/bobby/",
            "author_icon": "http://flickr.com/icons/bobby.jpg",
            "title": "Slack API Documentation",
            "title_link": "https://api.slack.com/",
            "text": "Optional text that appears within the attachment",
            "fields": [
                        {
                            "title": "Priority",
                            "value": "High",
                            "short": False
                        }
            ],
            "image_url": "http://my-website.com/path/to/image.jpg",
            "thumb_url": "http://example.com/path/to/thumb.png",
            "footer": "Slack API",
            "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
            "ts": 123456789
        }]
        notify_slack(to_channel, message, attachments=attachments)


@receiver(post_save, sender=Country)
def send_slack_notification_country_created(sender,  instance, created, **kwargs):
    if created:
        to_channel = "#location_%s" % (instance.continent.continent_code.lower())
        message = "Created new country %s %s on %s. \n Total country on %s: %s. \n CountryPhoto link: %s " % (
            instance.country_name, instance.country_emoji, instance.continent.continent_name, instance.continent.continent_name, instance.continent.country_count, instance.country_photo)
        attachments = [{
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#993472",
            "pretext": "Optional text that appears above the attachment block",
            "author_name": "Bobby Tables",
            "author_link": "http://flickr.com/bobby/",
            "author_icon": "http://flickr.com/icons/bobby.jpg",
            "title": "Slack API Documentation",
            "title_link": "https://api.slack.com/",
            "text": "Optional text that appears within the attachment",
            "fields": [
                        {
                            "title": "Priority",
                            "value": "High",
                            "short": False
                        }
            ],
            "image_url": "http://my-website.com/path/to/image.jpg",
            "thumb_url": "http://example.com/path/to/thumb.png",
            "footer": "Slack API",
            "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
            "ts": 123456789
        }]
        notify_slack(to_channel, message, attachments=attachments)
