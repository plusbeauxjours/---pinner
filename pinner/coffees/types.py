import graphene
from graphene_django.types import DjangoObjectType
from . import models
from config import types as config_types


class CoffeeType(DjangoObjectType):
    natural_time = graphene.String(source='natural_time')

    class Meta:
        model = models.Coffee


class MatchType(DjangoObjectType):
    natural_time = graphene.String(source='natural_time')
    is_host = graphene.Boolean()
    is_guest = graphene.Boolean()

    def resolve_is_host(self, info):
        user = info.context.user
        if self in user.host.all():
            return True
        else:
            return False

    def resolve_is_guest(self, info):
        user = info.context.user
        if self in user.guest.all():
            return True
        else:
            return False

    class Meta:
        model = models.Match


class RequestCoffeeResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    coffee = graphene.Field(CoffeeType)


class GetCoffeesResponse(graphene.ObjectType):
    coffees = graphene.List(CoffeeType)


class GetMatchesResponse(graphene.ObjectType):
    matches = graphene.List(MatchType)


class CoffeeDetailResponse(graphene.ObjectType):
    coffee = graphene.Field(CoffeeType)


class MatchResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    match = graphene.Field(MatchType)


class UnMatchResponse(graphene.ObjectType):
    ok = graphene.Boolean()
