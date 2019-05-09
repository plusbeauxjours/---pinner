import graphene
from graphene_django.types import DjangoObjectType
from . import models

from config import types as config_types
from users import types as user_types
from notifications import types as notification_types
from coffees import types as coffee_types


class CityType(DjangoObjectType):
    user_count = graphene.Int(source='user_count')
    user_log_count = graphene.Int(source='user_log_count')
    card_count = graphene.Int(source='card_count')
    like_count =graphene.Int(source='like_count')
    distance = graphene.Int()
    count = graphene.Int()
    diff = graphene.Int()
    is_liked = graphene.Boolean()

    def resolve_is_liked(self, info):
        user = info.context.user
        try:
            like = models.Like.objects.get(city=self, creator=user)
            return True
        except models.Like.DoesNotExist:
            return False

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
    usersNow = graphene.List(config_types.UserType)
    usersBefore = graphene.List(notification_types.MoveNotificationType)


class TripProfileResponse(graphene.ObjectType):
    city = graphene.Field(CityType)
    usersBefore = graphene.List(notification_types.MoveNotificationType)
    userCount = graphene.Int()
    coffees = graphene.List(coffee_types.CoffeeType)


class CountryProfileResponse(graphene.ObjectType):
    country = graphene.Field(CountryType)
    cities = graphene.List(CityType)
    usersNow = graphene.List(config_types.UserType)
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


class TripResponse(graphene.ObjectType):
    trip = graphene.List(notification_types.MoveNotificationType)


class ReportLocationResponse(graphene.ObjectType):
    ok = graphene.Boolean()

class ToggleLikeCityResponse(graphene.ObjectType):
    ok = graphene.Boolean()