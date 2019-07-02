import graphene
from graphene_django.types import DjangoObjectType
from config import types as config_types
from . import models
from graphene.types.union import Union


class NotificationType(DjangoObjectType):
    natural_time = graphene.String(source="natural_time")
    created_at = graphene.Date(source="created_at")

    class Meta:
        model = models.Notification


class MoveNotificationType(DjangoObjectType):
    natural_time = graphene.String(source="natural_time")
    created_at = graphene.Date(source="created_at")
    diff_days = graphene.Int(source="diff_days")

    class Meta:
        model = models.MoveNotification


class DurationAvatarsResponse(graphene.ObjectType):
    userCount = graphene.Int()
    usersBefore = graphene.List(MoveNotificationType)


class DurationDaysResponse(graphene.ObjectType):
    myTrips = graphene.List(MoveNotificationType)


class MarkAsReadResponse(graphene.ObjectType):
    notificationId = graphene.Int()
    ok = graphene.Boolean()


class AddTripResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    moveNotification = graphene.Field(MoveNotificationType)


class EditTripResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    moveNotification = graphene.Field(MoveNotificationType)


class DeleteTripResponse(graphene.ObjectType):
    tripId = graphene.Int()
    ok = graphene.Boolean()
