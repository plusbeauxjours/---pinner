from django.db import IntegrityError
from . import types, models
from graphql_jwt.decorators import login_required

from django.contrib.auth.models import User
from cards import models as card_models
from cards import types as card_types
from notifications import models as notification_models


@login_required
def resolve_get_cities(self, info, **kwargs):

    username = kwargs.get('username')
    profile = User.objects.get(username=username)

    cities = profile.movenotification.all().order_by('city').distinct('city')

    return types.FootprintsResponse(footprints=cities)


@login_required
def resolve_get_countries(self, info, **kwargs):

    username = kwargs.get('username')
    profile = User.objects.get(username=username)

    countries = profile.movenotification.all().order_by('city__country').distinct('city__country')

    return types.FootprintsResponse(footprints=countries)


@login_required
def resolve_get_continents(self, info, **kwargs):

    username = kwargs.get('username')
    profile = User.objects.get(username=username)

    continents = profile.movenotification.all().order_by('city__country__continent').distinct('city__country__continent')

    return types.FootprintsResponse(footprints=continents)


@login_required
def resolve_search_citiess(self, info, **kwargs):

    user = info.context.user
    term = kwargs.get('term')

    if len(term) < 2:

        raise Exception("Search Term is Too Short")

    else:

        cities = models.City.objects.filter(city_name__icontains=term)

        return types.CitiesResponse(cities=cities)


@login_required
def resolve_search_countries(self, info, **kwargs):

    user = info.context.user
    term = kwargs.get('term')

    if len(term) < 2:

        raise Exception("Search Term is Too Short")

    else:

        countries = models.Country.objects.filter(country_name__icontains=term)

        return types.CountriesResponse(countries=countries)


@login_required
def resolve_search_continents(self, info, **kwargs):

    user = info.context.user
    term = kwargs.get('term')

    if len(term) < 2:

        raise Exception("Search Term is Too Short")

    else:

        continents = models.Continent.objects.filter(continent_name__icontains=term)

        return types.ContinentsResponse(continents=continents)


@login_required
def resolve_trip_profile(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')

    city = models.City.objects.get(city_name=cityName)
    usersNow = city.currentCity.all()

    return types.TripProfileResponse(usersNow=usersNow, city=city)


@login_required
def resolve_city_profile(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')
    page = kwargs.get('page', 0)
    offset = 50 * page

    cards = card_models.Card.objects.filter(city__city_name=cityName).order_by(
        '-created_at')[offset:50 + offset]

    usersNow = User.objects.filter(
        profile__current_city__city_name=cityName).order_by('-username').distinct('username')

    usersBefore = notification_models.MoveNotification.objects.filter(
        city__city_name=cityName).order_by('-actor_id').distinct('actor_id')

    city = models.City.objects.get(city_name=cityName)

    return card_types.FeedResponse(cards=cards, usersNow=usersNow, usersBefore=usersBefore, city=city)


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
        city__country__country_name=countryName).order_by('-actor_id').distinct('actor_id')

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

    footprints = user.movenotification.all().order_by('-start_date')[offset:10 + offset]

    return types.FootprintsResponse(footprints=footprints)


@login_required
def resolve_near_cities(self, info, **kwargs):

    user = info.context.user
    nearCityPage = kwargs.get('nearCityPage', 0)
    cityName = kwargs.get('cityName')

    city = models.City.objects.get(city_name=cityName)
    if (nearCityPage is 0):
        cities = city.near_city.all()[:6]
    else:
        cities = city.near_city.all()[6:12]

    return types.CitiesResponse(cities=cities)


@login_required
def resolve_near_countries(self, info, **kwargs):

    user = info.context.user
    nearCountryPage = kwargs.get('nearCountryPage', 0)
    cityName = kwargs.get('cityName')

    city = models.City.objects.get(city_name=cityName)
    if (nearCountryPage is 0):
        countries = city.near_country.all()[:6]
    else:
        countries = city.near_country.all()[6:12]

    return types.CountriesResponse(countries=countries)


@login_required
def resolve_latest_cities(self, info, **kwargs):

    latestCityPage = kwargs.get('latestCityPage', 0)

    if (latestCityPage is 0):
        cities = models.City.objects.all().order_by(
            '-created_at')[:6]
    else:
        cities = models.City.objects.all().order_by(
            '-created_at')[6:12]

    return types.CitiesResponse(cities=cities)
