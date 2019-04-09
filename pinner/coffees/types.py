import graphene
from graphene_django.types import DjangoObjectType
from . import models
from config import types as config_types


class CoffeeType(DjangoObjectType):

    class Meta:
        model = models.Coffee


class MatchType(DjangoObjectType):

    class Meta:
        model = models.Match


class GetCoffeeResponse(graphene.ObjectType):
    coffees = graphene.List(CoffeeType)
