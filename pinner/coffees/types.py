import graphene
from graphene_django.types import DjangoObjectType
from . import models
from django.contrib.auth.models import User
from config import types as config_types


class UserType(DjangoObjectType):

    class Meta:
        model = User
        exclude_fields = ('password',)


class CoffeeType(DjangoObjectType):
    natural_time = graphene.String(source='natural_time')
    status = graphene.String(source='status')

    class Meta:
        model = models.Coffee


class MatchType(DjangoObjectType):
    natural_time = graphene.String(source='natural_time')
    is_host = graphene.Boolean()
    is_guest = graphene.Boolean()
    is_matching = graphene.Boolean()

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

    def resolve_is_matching(self, info):
        user = info.context.user
        if self in user.host.all() or user.guest.all():
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
    coffeeId = graphene.Int()
    match = graphene.Field(MatchType)
    ok = graphene.Boolean()


class UnMatchResponse(graphene.ObjectType):
    coffee = graphene.Field(CoffeeType)
    matchId = graphene.Int()
    ok = graphene.Boolean()


class DeleteCoffeeResponse(graphene.ObjectType):
    username = graphene.String()
    coffeeId = graphene.Int()
    ok = graphene.Boolean()
