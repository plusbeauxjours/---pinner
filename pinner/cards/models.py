from django.db import models
from django.contrib.auth.models import User
from django.contrib.humanize.templatetags.humanize import naturaltime
from config import models as config_models

class Location (models.Model):

    city = models.CharField(max_length=100)

    def __str__(self):
        return self.city

class Card(config_models.TimeStampedModel):

    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='cards')
    caption = models.TextField()
    location = models.ForeignKey(
        Location, on_delete=models.CASCADE, related_name='locations')
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
        return 'Location: {} - Caption: {} - Creator: {}'.format(self.location, self.caption, self.creator)

class Comment(config_models.TimeStampedModel):
    
    message = models.TextField()
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True)
    card = models.ForeignKey(
        Card, on_delete=models.CASCADE, null=True, related_name='comments')

    def __str__(self):
        return 'User: {} - Comment: {}'.format(self.creator.username, self.message)

class Like(config_models.TimeStampedModel):
    
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name='likes')
    card = models.ForeignKey(
        Card, on_delete=models.CASCADE, null=True, related_name='likes')

    def __str__(self):
        return 'User: {} - Card Caption: {}'.format(self.creator.username, self.card.caption)
