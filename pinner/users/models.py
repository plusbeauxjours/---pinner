from django.db import models
from django.contrib.auth.models import User
from config import models as config_models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from django.dispatch import receiver

from locations import models as locations_models


class Profile(config_models.TimeStampedModel):

    """ Profile Model """

    GENDERS = (
        ('M', 'Masculine'),
        ('F', 'Feminine')
    )

    user = models.OneToOneField(
        User, on_delete=models.CASCADE)
    bio = models.TextField(default='', blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    gender = models.CharField(max_length=15, blank=True, null=True)
    avatar = models.URLField(
        blank=True,
        default="http://basmed.unilag.edu.ng/wp-content/uploads/2018/10/avatar__181424.png")
    following = models.ManyToManyField(
        'self', blank=True, symmetrical=False, related_name='following_users')
    followers = models.ManyToManyField(
        'self', blank=True, symmetrical=False, related_name='followed_by')

    phoneNumber = models.CharField(max_length=20, blank=True, null=True)
    verifiedPhoneNumber = models.BooleanField(default=False)
    verifiedEmail = models.BooleanField(default=False)
    fbId = models.CharField(blank=True, null=True, max_length=20)

    currentLng = models.FloatField(blank=True, null=True)
    currentLat = models.FloatField(blank=True, null=True)
    currentCity = models.ForeignKey(
        locations_models.City, on_delete=models.SET_NULL, null=True, blank=True, related_name='currentCity', )
    currentCountry = models.ForeignKey(
        locations_models.Country, on_delete=models.SET_NULL, null=True, blank=True, related_name='currentCountry', )

    lastLng = models.FloatField(blank=True, null=True)
    lastLat = models.FloatField(blank=True, null=True)
    lastCity = models.ForeignKey(
        locations_models.City, on_delete=models.SET_NULL, null=True, blank=True, related_name='lastCity', )
    lastCountry = models.ForeignKey(
        locations_models.Country, on_delete=models.SET_NULL, null=True, blank=True, related_name='lastCountry', )

    def __str__(self):
        return self.user.username

    @property
    def country_log(self):
        return self.lastCountry.all()

    @property
    def post_count(self):
        return self.user.cards.all().count()

    @property
    def followers_count(self):
        return self.followers.all().count()

    @property
    def following_count(self):
        return self.following.all().count()

    @property
    def active_stories(self):
        return self.user.stories.filter(expired=False)

    class Meta:
        ordering = ['-created_at']
