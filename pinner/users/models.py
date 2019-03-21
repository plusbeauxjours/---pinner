from django.db import models
from django.contrib.auth.models import User
from config import models as config_models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from django.dispatch import receiver
from django.db.models.signals import pre_init

from locations import models as location_models


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
    followings = models.ManyToManyField(
        'self', blank=True, symmetrical=False, related_name='following_users')
    followers = models.ManyToManyField(
        'self', blank=True, symmetrical=False, related_name='followed_by')

    phone_number = models.CharField(max_length=20, blank=True, null=True)
    verified_phone_number = models.BooleanField(default=False)
    verified_email = models.BooleanField(default=False)
    fbId = models.CharField(blank=True, null=True, max_length=20)

    current_lat = models.FloatField(blank=True, null=True)
    current_lng = models.FloatField(blank=True, null=True)
    current_city = models.ForeignKey(
        location_models.City, on_delete=models.SET_NULL, null=True, blank=True, related_name='currentCity', )

    last_lat = models.FloatField(blank=True, null=True)
    last_lng = models.FloatField(blank=True, null=True)
    last_city = models.ForeignKey(
        location_models.City, on_delete=models.SET_NULL, null=True, blank=True, related_name='lastCity', )

    def __str__(self):
        return self.user.username

    @property
    def city_count(self):
        return self.user.movenotification.all().order_by('toCity').distinct('toCity').count()

    @property
    def post_count(self):
        return self.user.cards.all().count()

    @property
    def followers_count(self):
        return self.followed_by.all().count()

    @property
    def following_count(self):
        return self.following_users.all().count()

    @property
    def active_stories(self):
        return self.user.stories.filter(expired=False)

    class Meta:
        ordering = ['-created_at']
