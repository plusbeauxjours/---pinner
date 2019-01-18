import graphene
from graphene_django.types import DjangoObjectType
from . import models
from users import types as user_types
from config import types as config_types

class CardType(DjangoObjectType):
    like_count = graphene.Int(source='like_count')
    comment_count = graphene.Int(source='comment_count')

    class Meta: 
        model = models.Image

class LikeType(DjangoObjectType):

    class Meta: 
        model = models.Like

class CommentType(DjangoObjectType):
    
    class Meta:
        model = models.Comment

class FeedResponse(graphene.ObjectType, config_types.ResponseFields):
    cards = graphene.List(CardType)

class LikeCardResponse(graphene.ObjectType, config_types.ResponseFields):
    pass

class AddCommentResponse(graphene.ObjectType, config_types.ResponseFields):
    comment = graphene.Field(CommentType)

class DeleteCommentResponse(graphene.ObjectType, config_types.ResponseFields):
    pass