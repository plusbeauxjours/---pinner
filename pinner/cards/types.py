import graphene
from graphene_django.types import DjangoObjectType
from . import models
from config import types as config_types

from users import types as user_types
from locations import types as location_types
from notifications import types as notification_types


class CardType(DjangoObjectType):
    like_count = graphene.Int(source='like_count')
    comment_count = graphene.Int(source='comment_count')
    crated_at = graphene.Date(source='created_at')
    natural_time = graphene.String(source="natural_time")
    is_liked = graphene.Boolean()

    def resolve_is_liked(self, info):
        user = info.context.user
        try:
            like = models.Like.objects.get(card=self, creator=user)
            return True
        except models.Like.DoesNotExist:
            return False

    class Meta:
        model = models.Card


class LikeType(DjangoObjectType):

    class Meta:
        model = models.Like


class CommentType(DjangoObjectType):

    class Meta:
        model = models.Comment


class FeedResponse(graphene.ObjectType):
    city = graphene.Field(location_types.CityType)
    usersNow = graphene.List(user_types.UserType)
    usersBefore = graphene.List(notification_types.MoveNotificationType)
    cards = graphene.List(CardType)


class DurationCardsResponse(graphene.ObjectType):
    cards = graphene.List(CardType)


class LikeCardResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class CardLikeResponse(graphene.ObjectType):
    likes = graphene.List(LikeType)


class UploadCardResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    card = graphene.Field(CardType)


class EditCardResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class DeleteCardResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class AddCommentResponse(graphene.ObjectType):
    comment = graphene.Field(CommentType)


class DeleteCommentResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class CardDetailResponse(graphene.ObjectType):
    card = graphene.Field(CardType)


class SearchCardsResponse(graphene.ObjectType):
    cards = graphene.List(CardType)


class LatestCardsResponse(graphene.ObjectType):
    cards = graphene.List(CardType)


class FileInputType(graphene.InputObjectType):
    url = graphene.String()
    is_video = graphene.Boolean()
