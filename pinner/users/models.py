from django.db import models
from django.contrib.auth.models import User
from config import models as config_models
from locations import models as location_models
# from django.db.models import Count, Sum

# from django.dispatch import receiver

# from imagekit.models import ProcessedImageField
# from imagekit.processors import ResizeToFill
from cached_property import cached_property


class Profile(config_models.TimeStampedModel):

    """ Profile Model """

    GENDERS = (
        ('M', 'Masculine'),
        ('F', 'Feminine')
    )

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(default='', blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    gender = models.CharField(max_length=15, blank=True, null=True)
    nationality = models.ForeignKey(location_models.Country, on_delete=models.SET_NULL,
                                    null=True, blank=True, related_name='nationality')
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

    current_city = models.ForeignKey(
        location_models.City, on_delete=models.SET_NULL, null=True, blank=True, related_name='currentCity', )

    def __str__(self):
        return self.user.username

    @cached_property
    def username(self):
        return self.user.username

    @cached_property
    def city_count(self):
        return self.user.movenotification.all().order_by('city').distinct('city').count()

    @cached_property
    def country_count(self):
        return self.user.movenotification.all().order_by('city__country').distinct('city__country').count()

    @cached_property
    def continent_count(self):
        return self.user.movenotification.all().order_by('city__country__continent').distinct('city__country__continent').count()

    @cached_property
    def post_count(self):
        return self.user.cards.all().count()

    @cached_property
    def followers_count(self):
        return self.followed_by.all().count()

    @cached_property
    def following_count(self):
        return self.following_users.all().count()

    @cached_property
    def trip_count(self):
        return self.user.movenotification.all().count()

    # @property
    # def cities(self):
    #     return location_models.City.objects.filter(
    #         movenotification__actor__username=self.user.username).annotate(
    #         count=Count('movenotification', distinct=True)).annotate(
    #         diff=Sum('movenotification__diff_days')).order_by('-count')[:6]

    # @property
    # def countries(self):
    #     return location_models.Country.objects.filter(
    #         cities__movenotification__actor__username=self.user.username).annotate(
    #         count=Count('cities__movenotification', distinct=True)).annotate(
    #         diff=Sum('cities__movenotification__diff_days')).order_by('-count')[:6]

    class Meta:
        ordering = ['-created_at']
