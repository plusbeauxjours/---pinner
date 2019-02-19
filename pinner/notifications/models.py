from django.db import models
from django.contrib.auth.models import User
from cards import models as card_models
from config import models as config_models


class Notification(config_models.TimeStampedModel):

    VERBS = (
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('follow', 'Follow')
    )

    actor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='actor')
    target = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='target')
    verb = models.CharField(max_length=10, choices=VERBS)
    payload = models.ForeignKey(
        card_models.Card, on_delete=models.CASCADE, null=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return '{} / From: {} {} 👉🏻 To: {} Read:{}'.format(
            self.id,
            self.actor.username,
            self.verb,
            self.target.username,
            self.read
        )
