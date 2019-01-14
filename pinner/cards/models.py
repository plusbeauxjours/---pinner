from django.db import models
from pinner.users import models as user_models
from taggit.managers import TaggableManager
from django.contrib.humanize.templatetags.humanize import naturaltime


class Location(models.Model):

    city = models.CharField(max_length=30)

class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta: 
        abstract=True

class Card(TimeStampedModel):

    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, related_name='location')
    caption = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete=models.SET_NULL, null=True, related_name='cards')
    tags = TaggableManager()

    @property
    def like_count(self):
         return self.likes.all().count()

    @property
    def comment_count(self):
        return self.comments.all().count()

    @property
    def natural_time(self):
        return naturaltime(self.create_at)

    def __str__(self):
        return 'Location: {} - Caption: {} - Creator: {}'.format(self.location, self.caption, self.creator)

    class Meta:
        ordering = ['-created_at']

class Comment(TimeStampedModel):
    
    message = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete=models.SET_NULL, null=True)
    card = models.ForeignKey(Card, on_delete=models.SET_NULL, null=True, related_name='comments')

    def __str__(self):
        return self.message

class Like(TimeStampedModel):
    
    creator = models.ForeignKey(user_models.User, on_delete=models.SET_NULL, null=True)
    card = models.ForeignKey(Card, on_delete=models.SET_NULL, null=True )

    def __str(self):
        return 'User: {} - Card Caption: {}'.format(self.creator.username, self.card.caption)