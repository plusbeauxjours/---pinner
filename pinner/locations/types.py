import graphene
from graphene_django.types import DjangoObjectType
from . import models
from config import types as config_types
from users import types as users_types
from notifications import types as notifications_types


class CountryType(DjangoObjectType):
    city_count = graphene.Int(source='city_count')
    user_count = graphene.Int(source='user_count')
    user_log_count = graphene.Int(source='user_log_count')

    class Meta:
        model = models.Country


class CityType(DjangoObjectType):
    city_count = graphene.Int(source='city_count')
    user_count = graphene.Int(source='user_count')
    user_log_count = graphene.Int(source='user_log_count')
    card_count = graphene.Int(source='card_count')

    class Meta:
        model = models.City


class CountriesResponse(graphene.ObjectType):
    countries = graphene.List(CountryType)


class CitiesResponse(graphene.ObjectType):
    cities = graphene.List(CityType)


class FootprintsResponse(graphene.ObjectType):
    footprints = graphene.List(notifications_types.MoveNotificationType)


class ReportLocationResponse(graphene.ObjectType):
    ok = graphene.Boolean()
