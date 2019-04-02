import graphene
from graphene_django.types import DjangoObjectType
from config import types as config_types
from . import models


class NotificationType(DjangoObjectType):
    natural_time = graphene.String(source="natural_time")
    created_at = graphene.Date(source="created_at")

    class Meta:
        model = models.Notification


class MoveNotificationType(DjangoObjectType):
    natural_time = graphene.String(source="natural_time")
    created_at = graphene.Date(source="created_at")

    class Meta:
        model = models.MoveNotification


class DurationTripsResponse(graphene.ObjectType):
    moveNotifications = graphene.List(MoveNotificationType)


class DurationAvatarsResponse(graphene.ObjectType):
    usersBefore = graphene.List(MoveNotificationType)


class GetNotificationsResponse(graphene.ObjectType):
    notifications = graphene.List(NotificationType)
    move_notifications = graphene.List(MoveNotificationType)
    ok = graphene.Boolean()


class GetMoveNotificationsResponse(graphene.ObjectType):
    notifications = graphene.List(MoveNotificationType)
    ok = graphene.Boolean()


class MarkAsReadResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class AddTripResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    moveNotification = graphene.Field(MoveNotificationType)


class EditTripResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    moveNotification = graphene.Field(MoveNotificationType)


class DeleteTripResponse(graphene.ObjectType):
    ok = graphene.Boolean()
