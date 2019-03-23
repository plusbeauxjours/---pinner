from django.db import IntegrityError
from . import types, models
from graphql_jwt.decorators import login_required

from django.contrib.auth.models import User
from cards import models as card_models
from notifications import models as notification_models


@login_required
def resolve_get_countries(self, info):

    countries = models.Country.objects.all().order_by(
        '-created_at')

    return types.CountriesResponse(countries=countries)


@login_required
def resolve_get_cities(self, info):

    cities = models.City.objects.all().order_by(
        '-created_at')

    return types.CitiesResponse(cities=cities)


@login_required
def resolve_city_profile(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')
    page = kwargs.get('page', 0)
    offset = 5 * page

    cards = card_models.Card.objects.filter(city__city_name=cityName).order_by(
        '-created_at')[offset:5 + offset]

    usersNow = User.objects.filter(
        profile__current_city__city_name=cityName).order_by('-username').distinct('username')

    usersBefore = notification_models.MoveNotification.objects.filter(
        to_city__city_name=cityName).order_by('-actor_id').distinct('actor_id')

    city = models.City.objects.get(city_name=cityName)

    return types.CityProfileResponse(cards=cards, usersNow=usersNow, usersBefore=usersBefore, city=city)


@login_required
def resolve_country_profile(self, info, **kwargs):

    user = info.context.user
    countryName = kwargs.get('countryName')
    page = kwargs.get('page', 0)
    offset = 5 * page

    cities = models.City.objects.filter(country__country_name=countryName)

    usersNow = User.objects.filter(
        profile__current_city__country__country_name=countryName).order_by('-username').distinct('username')

    usersBefore = notification_models.MoveNotification.objects.filter(
        to_city__country__country_name=countryName).order_by('-actor_id').distinct('actor_id')

    country = models.Country.objects.get(country_name=countryName)

    return types.CountryProfileResponse(cities=cities, usersNow=usersNow, usersBefore=usersBefore, country=country)


@login_required
def resolve_continent_profile(self, info, **kwargs):

    user = info.context.user
    continentName = kwargs.get('continentName')
    page = kwargs.get('page', 0)
    offset = 5 * page

    continent = models.Continent.objects.get(continent_name=continentName)
    print(continent)

    countries = models.Country.objects.filter(continent__continent_name=continentName)

    return types.ContinentProfileResponse(continent=continent, countries=countries)


@login_required
def resolve_get_footprints(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 10 * page

    footprints = user.movenotification.all().order_by('-created_at')[offset:10 + offset]

    return types.FootprintsResponse(footprints=footprints)


@login_required
def resolve_near_cities(self, info):

    user = info.context.user

    cities = user.profile.current_city.near_city.all()

    return types.CitiesResponse(cities=cities)


@login_required
def resolve_near_countries(self, info):

    user = info.context.user

    countries = user.profile.current_city.near_country.all()

    return types.CountriesResponse(countries=countries)
