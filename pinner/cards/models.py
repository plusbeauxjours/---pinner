from django.db import models

class Card(models.Model):

    """Card Model """

class Like(models.Model):

    """Like Model"""


class Comment(models.Model):

    """Comment Model"""

    comment = models.TextField()
    card = models.ForeignKey(
        Card, related_name = 'comments', on_delete = models.CASCADE
    )