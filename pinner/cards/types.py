import graphene
from graphene_django.types import DjangoObjectType

from config import types as config_types
from users import types as user_types
from locations import types as location_types
from notifications import types as notification_types
from coffees import types as coffee_types


class FeedResponse(graphene.ObjectType):
    city = graphene.Field(location_types.CityType)


class FileInputType(graphene.InputObjectType):
    url = graphene.String()
    is_video = graphene.Boolean()


class FirstAnnotateResponse(graphene.ObjectType):
    count = graphene.Int()
    city = graphene.Field(location_types.CityType)
    usersNow = graphene.List(coffee_types.UserType)
    usersBefore = graphene.List(notification_types.MoveNotificationType)


class SecondAnnotateResponse(graphene.ObjectType):
    count = graphene.Int()
    country = graphene.Field(location_types.CountryType)
    cities = graphene.List(location_types.CityType)
    usersNow = graphene.List(coffee_types.UserType)
    usersBefore = graphene.List(notification_types.MoveNotificationType)


class ThirdAnnotateResponse(graphene.ObjectType):
    count = graphene.Int()
    countries = graphene.List(location_types.CountryType)
    usersNow = graphene.List(coffee_types.UserType)
    usersBefore = graphene.List(notification_types.MoveNotificationType)
    continent = graphene.Field(location_types.ContinentType)
    continents = graphene.List(location_types.ContinentType)


class UsersNowResponse(graphene.ObjectType):
    page = graphene.Int()
    hasNextPage = graphene.Boolean()
    usersNow = graphene.List(coffee_types.UserType)


class usersBeforeResponse(graphene.ObjectType):
    page = graphene.Int()
    hasNextPage = graphene.Boolean()
    usersBefore = graphene.List(notification_types.MoveNotificationType)
