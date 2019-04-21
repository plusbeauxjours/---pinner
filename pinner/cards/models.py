from django.db import models
from django.contrib.auth.models import User
from django.contrib.humanize.templatetags.humanize import naturaltime
from config import models as config_models
from locations import models as location_models


class Card(config_models.TimeStampedModel):

    CATEGORY = (
        ('blabla', 'Blabla'),
        ('meetup', 'Meetup')
    )

    category = models.CharField(max_length=12, choices=CATEGORY, default='meetup')
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='cards')
    caption = models.TextField()
    city = models.ForeignKey(
        location_models.City, on_delete=models.CASCADE, related_name='cards', null=True)
    country = models.ForeignKey(
        location_models.Country, on_delete=models.CASCADE, related_name='cards', null=True)
    file = models.URLField(null=True, blank=True)

    @property
    def like_count(self):
        return self.likes.all().count()

    @property
    def comment_count(self):
        return self.comments.all().count()

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    def __str__(self):
        return 'Country: {} - City: {} - Caption: {} - Creator: {} '.format(self.country, self.city, self.caption, self.creator)

    class Meta:
        ordering = ['-created_at']


class Comment(config_models.TimeStampedModel):

    message = models.TextField()
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True)
    card = models.ForeignKey(
        Card, on_delete=models.CASCADE, null=True, related_name='comments')

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    def __str__(self):
        return '{} / User: {} - Comment: {} - Card: {} {}'.format(self.id, self.creator.username, self.message, self.card_id, self.card.city)

    class Meta:
        ordering = ['-created_at']


class Like(config_models.TimeStampedModel):

    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name='card_likes')
    card = models.ForeignKey(
        Card, on_delete=models.CASCADE, null=True, related_name='likes')

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    def __str__(self):
        return 'User: {} - Card Caption: {}'.format(self.creator.username, self.card.caption)
