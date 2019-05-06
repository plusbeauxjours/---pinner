import graphene
from graphene_django.types import DjangoObjectType
from . import models

from config import types as config_types
from users import types as user_types
from cards import types as koko_types
from notifications import types as notification_types
from coffees import types as coffee_types


class CityType(DjangoObjectType):
    city_count = graphene.Int(source='city_count')
    user_count = graphene.Int(source='user_count')
    user_log_count = graphene.Int(source='user_log_count')
    card_count = graphene.Int(source='card_count')
    distance = graphene.Int()
    count = graphene.Int()
    diff = graphene.Int()

    class Meta:
        model = models.City


class CountryType(DjangoObjectType):
    city_count = graphene.Int(source='city_count')
    card_count = graphene.Int(source='card_count')
    count = graphene.Int()
    diff = graphene.Int()

    class Meta:
        model = models.Country


class ContinentType(DjangoObjectType):
    country_count = graphene.Int(source='country_count')

    class Meta:
        model = models.Continent


class CityProfileResponse(graphene.ObjectType):
    city = graphene.Field(CityType)
    usersNow = graphene.List(user_types.UserType)
    usersBefore = graphene.List(notification_types.MoveNotificationType)


class TripProfileResponse(graphene.ObjectType):
    city = graphene.Field(CityType)
    usersBefore = graphene.List(notification_types.MoveNotificationType)
    userCount = graphene.Int()
    coffees = graphene.List(coffee_types.CoffeeType)


class CountryProfileResponse(graphene.ObjectType):
    country = graphene.Field(CountryType)
    cities = graphene.List(CityType)
    usersNow = graphene.List(user_types.UserType)
    usersBefore = graphene.List(notification_types.MoveNotificationType)


class ContinentProfileResponse(graphene.ObjectType):
    continent = graphene.Field(ContinentType)
    countries = graphene.List(CountryType)


class CitiesResponse(graphene.ObjectType):
    cities = graphene.List(CityType)


class CountriesResponse(graphene.ObjectType):
    countries = graphene.List(CountryType)


class ContinentsResponse(graphene.ObjectType):
    continents = graphene.List(ContinentType)


class FootprintsResponse(graphene.ObjectType):
    footprints = graphene.List(notification_types.MoveNotificationType)


class ReportLocationResponse(graphene.ObjectType):
    ok = graphene.Boolean()

