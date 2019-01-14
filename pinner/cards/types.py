import graphen
from graphene_django.types import DjangoObjectType
from . import moedls, types

class CardType(DjangoObjectType):

    class Meta: 
        model = models.Image

class LikeType(DjangoObjectType):

    class Meta: 
        model = models.Like

class CommentType(DjangoObjectType):
    
    class Meta:
        model = models.Comment

class FeedResponse(graphene.ObjectType):
    ok = graphene.Boolean(required=True)
    cards = graphene.List(types.ImageType)
    error = graphene.String()