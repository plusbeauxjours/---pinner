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


class CountriesResponse(graphene.ObjectType):
    countries = graphene.List(CountryType)


class CitiesResponse(graphene.ObjectType):
    cities = graphene.List(CityType)


class ReportLocationResponse(graphene.ObjectType):
    ok = graphene.Boolean()
