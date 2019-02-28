import graphene
from graphene_django.types import DjangoObjectType
from config import types as config_types
from . import models


class NotificationType(DjangoObjectType):
    created_at = graphene.String(source="natural_time")

    class Meta:
        model = models.Notification


class MoveNotificationType(DjangoObjectType):
    created_at = graphene.String(source="natural_time")

    class Meta:
        model = models.MoveNotification


class GetNotificationsResponse(graphene.ObjectType):
    notifications = graphene.List(NotificationType)
    ok = graphene.Boolean()


class GetMoveNotificationsResponse(graphene.ObjectType):
    move_notifications = graphene.List(NotificationType)
    ok = graphene.Boolean()


class MarkAsReadResponse(graphene.ObjectType):
    ok = graphene.Boolean()
