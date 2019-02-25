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


class CountryResponse(graphene.ObjectType):
    country = graphene.List(CountryType)


class CityResponse(graphene.ObjectType):
    city = graphene.List(CityType)


class ReportLocationResponse(graphene.ObjectType):
    ok = graphene.Boolean()
