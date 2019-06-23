import uuid
from django.db import models
from django.contrib.auth.models import User
from config import models as config_models
from locations import models as location_models
from django.contrib.humanize.templatetags.humanize import naturaltime

from django.dispatch import receiver
from django.db.models.signals import post_delete

from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from cached_property import cached_property


class Avatar(config_models.TimeStampedModel):
    is_main = models.BooleanField(default=False)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, blank=True, null=True)
    creator = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE, related_name='avatar')
    image = ProcessedImageField(
        null=True,
        blank=True,
        processors=[ResizeToFill(935, 935)],
        format='JPEG',
        options={'quality': 100}
    )
    thumbnail = ProcessedImageField(
        null=True,
        blank=True,
        processors=[ResizeToFill(300, 300)],
        format='JPEG',
        options={'quality': 100}
    )

    @cached_property
    def like_count(self):
        return self.likes.all().count()

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    class Meta:
        ordering = ['-created_at']


@receiver(post_delete, sender=Avatar)
def delete_attached_image(sender, **kwargs):
    instance = kwargs.pop('instance')
    instance.image.delete(save=False)

    @property
    def natural_time(self):
        return naturaltime(self.created_at)


class Like(config_models.TimeStampedModel):

    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name='avatar_likes')
    avatar = models.ForeignKey(
        Avatar, on_delete=models.CASCADE, null=True, related_name='likes')


class Profile(config_models.TimeStampedModel):

    """ Profile Model """

    GENDERS = (
        ('Masculine', 'Masculine'),
        ('Feminine', 'Feminine'),
        ('Genderqueer', 'Genderqueer')
    )

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(default='', blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    gender = models.CharField(max_length=15, blank=True, null=True, choices=GENDERS)
    residence = models.ForeignKey(
        location_models.Country, blank=True, null=True, on_delete=models.CASCADE, related_name='residence')
    nationality = models.ForeignKey(
        location_models.Country, blank=True, null=True, on_delete=models.CASCADE, related_name='nationality')
    avatar = models.URLField(
        blank=True,
        default="http://basmed.unilag.edu.ng/wp-content/uploads/2018/10/avatar__181424.png")
    avatars = models.ManyToManyField(Avatar, related_name='avatars')
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    verified_phone_number = models.BooleanField(default=False)
    verified_email = models.BooleanField(default=False)
    email = models.EmailField(blank=True, null=True, max_length=50)
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
