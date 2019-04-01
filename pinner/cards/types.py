import graphene
from graphene_django.types import DjangoObjectType
from . import models

from config import types as config_types
from users import types as user_types
from locations import types as location_types
from notifications import types as notification_types


class LikeType(DjangoObjectType):

    class Meta:
        model = models.Like


class CommentType(DjangoObjectType):

    class Meta:
        model = models.Comment


class FeedResponse(graphene.ObjectType):
    city = graphene.Field(location_types.CityType)
    cards = graphene.List(location_types.CardType)
    usersNow = graphene.List(user_types.UserType)
    usersBefore = graphene.List(notification_types.MoveNotificationType)


class DurationCardsResponse(graphene.ObjectType):
    cards = graphene.List(location_types.CardType)


class LikeCardResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class CardLikeResponse(graphene.ObjectType):
    likes = graphene.List(LikeType)


class UploadCardResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    card = graphene.Field(location_types.CardType)


class EditCardResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class DeleteCardResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class AddCommentResponse(graphene.ObjectType):
    comment = graphene.Field(CommentType)


class DeleteCommentResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class CardDetailResponse(graphene.ObjectType):
    card = graphene.Field(location_types.CardType)


class SearchCardsResponse(graphene.ObjectType):
    cards = graphene.List(location_types.CardType)


class LatestCardsResponse(graphene.ObjectType):
    cards = graphene.List(location_types.CardType)


class FileInputType(graphene.InputObjectType):
    url = graphene.String()
    is_video = graphene.Boolean()
