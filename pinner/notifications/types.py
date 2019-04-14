import graphene
from graphene_django.types import DjangoObjectType
from config import types as config_types
from . import models
from cards import types as card_types
from graphene.types.resolver import dict_resolver


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


class DataType(graphene.ObjectType):
    date = graphene.String()
    count = graphene.Int()

    class Meta:
        default_resolver = dict_resolver


class DurationTripsResponse(graphene.ObjectType):
    moveNotifications = graphene.List(MoveNotificationType)


class DurationAvatarsResponse(graphene.ObjectType):
    days = graphene.Int()
    usersBefore = graphene.List(MoveNotificationType)


class DurationDaysResponse(graphene.ObjectType):
    myTrips = graphene.List(MoveNotificationType)


class GetNotificationsResponse(graphene.ObjectType):
    notifications = graphene.List(NotificationType)
    ok = graphene.Boolean()


class GetHeatmapDataReaponse(graphene.ObjectType):
    cards = graphene.List(DataType)
    startDate = graphene.Date()
    endDate = graphene.Date()


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
