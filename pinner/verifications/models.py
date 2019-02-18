from django.db import models
from django.contrib.auth.models import User
from config import models as config_models
from django.db.models.signals import pre_save
from django.dispatch import receiver
import random
import math
import uuid


class Verification(config_models.TimeStampedModel):

    TARGETS = (
        ('phone', 'Phone'),
        ('email', 'Email')
    )

    target = models.CharField(max_length=10, choices=TARGETS)
    payload = models.CharField(max_length=30)
    key = models.CharField(max_length=40, blank=True)
    verified = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return '{} target: {} 👉🏻 To: {} Verified:{}'.format(
            self.id,
            self.target,
            self.payload,
            self.verified,
        )


@receiver(pre_save, sender=Verification)
def create_key(sender, **kwargs):
    instance = kwargs.pop('instance')
    instance.key = str(math.floor(random.random() * 1000000))
