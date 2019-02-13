from django.db import models
from django.contrib.auth.models import User
from django.contrib.humanize.templatetags.humanize import naturaltime
from config import models as config_models

class File(config_models.TimeStampedModel):

    fileURL = models.URLField()
    is_video = models.BooleanField(default=False)
    creator = models.ForeignKey(
        User, related_name='file_images', on_delete=models.CASCADE, null=True)
    
    def __str__(self):
        return self.creator.username

class Card(config_models.TimeStampedModel):

    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='cards')
    caption = models.TextField()
    location = models.CharField(max_length=140, blank=True, null=True)
    files = models.ManyToManyField(File, related_name='parent')
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

    class Meta:
        ordering = ['-created_at']

class Comment(config_models.TimeStampedModel):
    
    message = models.TextField()
    creator = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True)
    card = models.ForeignKey(
        Card, on_delete=models.SET_NULL, null=True, related_name='comments')

    def __str__(self):
        return 'User: {} - Comment: {}'.format(self.creator.username, self.message)

class Like(config_models.TimeStampedModel):
    
    creator = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True)
    card = models.ForeignKey(
        Card, on_delete=models.SET_NULL, null=True, related_name='likes')

    def __str__(self):
        return 'User: {} - Card Caption: {}'.format(self.creator.username, self.card.caption)
    
class Story(config_models.TimeStampedModel):
	
	    """ Story Model """
	
	    file = models.ForeignKey(File, on_delete=models.CASCADE)
	    creator = models.ForeignKey(
	        User, related_name='stories', on_delete=models.CASCADE)
	    expired = models.BooleanField(default=False)
	
	    def __str__(self):
	        return self.creator.username