from django.db import models
from django.contrib.auth.models import User
from config import models as config_models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill


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
    gender = models.CharField(max_length=1, choices=GENDERS, default='M')
    avatar = models.URLField(
        blank=True, default="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80")
    following = models.ManyToManyField(
        'self', blank=True, symmetrical=False, related_name='following_users')
    followers = models.ManyToManyField(
        'self', blank=True, symmetrical=False, related_name='followed_by')
    phoneNumber = models.CharField(max_length=20, blank=True, null=True)
    verifiedPhoneNumber = models.BooleanField(default=False)
    verifiedEmail = models.BooleanField(default=False)
    lastLng = models.IntegerField(blank=True, null=True)
    lastLat = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.user.username

    @property
    def post_count(self):
        return self.user.images.all().count()

    @property
    def followers_count(self):
        return self.followers.all().count()

    @property
    def following_count(self):
        return self.following.all().count()

    @property
    def active_stories(self):
        return self.user.stories.filter(expired=False)