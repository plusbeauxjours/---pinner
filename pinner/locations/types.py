import graphene
from graphene_django.types import DjangoObjectType
from . import models
from config import types as config_types


class CountryType(DjangoObjectType):

    class Meta:
        model = models.Country


class CityType(DjangoObjectType):

    class Meta:
        model = models.City


class LocationResponse(graphene.ObjectType):
    country = graphene.List(CountryType)
    city = graphene.List(CityType)


class ReportLocationResponse(graphene.ObjectType):
    ok = graphene.Boolean()
