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


class RequestCoffeeResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    coffee = graphene.List(CoffeeType)


class GetCoffeeResponse(graphene.ObjectType):
    coffee = graphene.List(CoffeeType)