from django.db import models
from django.contrib.auth.models import User
from django.contrib.humanize.templatetags.humanize import naturaltime
from config import models as config_models
from locations import models as location_models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from cached_property import cached_property

from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.db.models.signals import post_delete 


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
        location_models.City, on_delete=models.CASCADE, related_name='cards',  null=True)
    country = models.ForeignKey(
        location_models.Country, on_delete=models.CASCADE, related_name='cards', null=True)
    file = ProcessedImageField(
        null=True,
        blank=True,
        processors = [ResizeToFill(600, 400)],
        format = 'JPEG',
        options = {'quality':100}
    )

    @cached_property
    def like_count(self):
        return self.likes.all().count()

    @cached_property
    def comment_count(self):
        return self.comments.all().count()

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    def __str__(self):
        return self.caption
        
    class Meta:
        ordering = ['-created_at']

@receiver(pre_save, sender=Card)
def get_country(sender, **kwargs):
    instance = kwargs.pop('instance')
    instance.country = instance.city.country

@receiver(post_delete, sender=Card)
def delete_attached_image(sender, **kwargs): 
    instance = kwargs.pop('instance')  
    instance.file.delete(save=False)



class Comment(config_models.TimeStampedModel):

    message = models.TextField()
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True)
    card = models.ForeignKey(
        Card, on_delete=models.CASCADE, null=True, related_name='comments')
    edited = models.BooleanField(default=False)

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    def __str__(self):
        return self.message


class Like(config_models.TimeStampedModel):

    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name='card_likes')
    card = models.ForeignKey(
        Card, on_delete=models.CASCADE, null=True, related_name='likes')

    def __str__(self):
        return self.card.caption


class LikeComment(config_models.TimeStampedModel):

    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name='comment_likes')
    comment = models.ForeignKey(
        Comment, on_delete=models.CASCADE, null=True, related_name='likes')

    def __str__(self):
        return self.comment.message
