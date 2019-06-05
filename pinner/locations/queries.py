from django.db import IntegrityError

from . import types, models
from graphql_jwt.decorators import login_required
from django.utils import timezone
from django.db.models import Q
from django.db.models.expressions import RawSQL

from django.contrib.auth.models import User
from cards import types as card_types
from notifications import models as notification_models
from coffees import models as coffee_models


@login_required
def resolve_header(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')

    print(cityName)
    city = models.City.objects.get(city_name=cityName)
    print('header')

    return types.HeaderResponse(city=city)


@login_required
def resolve_search_cities(self, info, **kwargs):

    user = info.context.user

    search = kwargs.get('search')

    cities = models.City.objects.filter(city_name__istartswith=search)

    return types.CitiesResponse(cities=cities)


@login_required
def resolve_search_trip_cities(self, info, **kwargs):

    user = info.context.user

    search = kwargs.get('search')

    cities = models.City.objects.filter(city_name__istartswith=search)

    return types.CitiesResponse(cities=cities)


@login_required
def resolve_search_countries(self, info, **kwargs):

    user = info.context.user

    search = kwargs.get('search')

    countries = models.Country.objects.filter(country_name__istartswith=search)

    return types.CountriesResponse(countries=countries)


@login_required
def resolve_search_continents(self, info, **kwargs):

    user = info.context.user

    search = kwargs.get('search')

    continents = models.Continent.objects.filter(continent_name__istartswith=search)

    return types.ContinentsResponse(continents=continents)


@login_required
def resolve_trip_profile(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')
    startDate = kwargs.get('startDate')
    endDate = kwargs.get('endDate')

    city = models.City.objects.prefetch_related('movenotification').prefetch_related('coffee').get(city_name=cityName)

    usersBefore = city.movenotification.filter(Q(start_date__lte=(endDate)) |
                                               Q(end_date__gte=(startDate))).order_by('actor_id').distinct('actor_id')

    userCount = usersBefore.count()

    coffees = city.coffee.filter(created_at__range=(startDate, endDate))[:42]

    return types.TripProfileResponse(city=city, usersBefore=usersBefore, userCount=userCount, coffees=coffees)


@login_required
def resolve_city_profile(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')
    page = kwargs.get('page', 0)

    city = models.City.objects.prefetch_related('coffee').get(city_name=cityName)

    usersNow = User.objects.filter(
        profile__current_city__city_name=cityName).order_by('-id').distinct('id')[:12]

    coffees = city.coffee.filter(expires__gt=timezone.now())

    if usersNow.count() < 5:
        usersBefore = notification_models.MoveNotification.objects.filter(
            city__city_name=cityName).exclude(actor__id__in=usersNow).order_by('-actor_id').distinct('actor_id')[:12]
    else:
        usersBefore = notification_models.MoveNotification.objects.filter(
            id=0)
    print(usersNow,
          usersBefore,
          city,
          coffees)

    return card_types.FirstAnnotateResponse(usersNow=usersNow, usersBefore=usersBefore, city=city, coffees=coffees)


@login_required
def resolve_city_users_now(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')
    page = kwargs.get('page', 0)
    offset = 20 * page

    nextPage = page+1

    usersNow = User.objects.filter(
        profile__current_city__city_name=cityName).order_by('-id').distinct('id')

    hasNextPage = offset < usersNow.count()

    usersNow = usersNow[offset:20 + offset]

    return card_types.UsersNowResponse(usersNow=usersNow,  page=nextPage, hasNextPage=hasNextPage)


@login_required
def resolve_city_users_before(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')
    page = kwargs.get('page', 0)
    offset = 20 * page

    nextPage = page+1

    usersBefore = notification_models.MoveNotification.objects.filter(
        city__city_name=cityName).order_by('-actor_id').distinct('actor_id')

    hasNextPage = offset < usersBefore.count()

    usersBefore = usersBefore[offset:20 + offset]

    return card_types.usersBeforeResponse(usersBefore=usersBefore,  page=nextPage, hasNextPage=hasNextPage)


@login_required
def resolve_country_profile(self, info, **kwargs):

    user = info.context.user
    countryName = kwargs.get('countryName')
    page = kwargs.get('page', 0)

    country = models.Country.objects.get(country_name=countryName)

    allCities = models.City.objects.values('id').filter(country__country_name=countryName)

    usersNow = User.objects.filter(
        profile__current_city__country__country_name=countryName).order_by('-id').distinct('id')[:12]

    if usersNow.count() < 5:
        usersBefore = notification_models.MoveNotification.objects.filter(
            city__country__country_name=countryName).exclude(actor__id__in=usersNow).order_by('-actor_id').distinct('actor_id')[:12]
    else:
        usersBefore = notification_models.MoveNotification.objects.filter(
            id=0)

    cities = models.City.objects.filter(country__country_name=countryName)

    coffees = coffee_models.Coffee.objects.filter(Q(city__id__in=allCities) & Q(expires__gt=timezone.now()))

    return card_types.SecondAnnotateResponse(cities=cities, usersNow=usersNow, usersBefore=usersBefore, country=country, coffees=coffees)


@login_required
def resolve_country_users_now(self, info, **kwargs):

    user = info.context.user
    countryName = kwargs.get('countryName')
    page = kwargs.get('page', 0)
    offset = 20 * page

    nextPage = page+1

    usersNow = User.objects.filter(
        profile__current_city__country__country_name=countryName).order_by('-id').distinct('id')

    hasNextPage = offset < usersNow.count()

    usersNow = usersNow[offset:20 + offset]

    return card_types.UsersNowResponse(usersNow=usersNow,  page=nextPage, hasNextPage=hasNextPage)


@login_required
def resolve_country_users_before(self, info, **kwargs):

    user = info.context.user
    countryName = kwargs.get('countryName')
    page = kwargs.get('page', 0)
    offset = 20 * page

    nextPage = page+1

    usersBefore = notification_models.MoveNotification.objects.filter(
        city__country__country_name=countryName).order_by('-actor_id').distinct('actor_id')

    hasNextPage = offset < usersBefore.count()

    usersBefore = usersBefore[offset:20 + offset]

    return card_types.usersBeforeResponse(usersBefore=usersBefore,  page=nextPage, hasNextPage=hasNextPage)


@login_required
def resolve_continent_profile(self, info, **kwargs):

    user = info.context.user
    continentName = kwargs.get('continentName')
    page = kwargs.get('page', 0)

    continent = models.Continent.objects.get(continent_name=continentName)

    allCities = models.City.objects.values('id').filter(country__continent__continent_name=continentName)

    usersNow = User.objects.filter(
        profile__current_city__country__continent__continent_name=continentName).order_by('-id').distinct('id')[:12]

    if usersNow.count() < 5:
        usersBefore = notification_models.MoveNotification.objects.filter(
            city__country__continent__continent_name=continentName).exclude(actor__id__in=usersNow).order_by('-actor_id').distinct('actor_id')[:12]
    else:
        usersBefore = notification_models.MoveNotification.objects.filter(
            id=0)

    countries = models.Country.objects.filter(continent__continent_name=continentName)

    coffees = coffee_models.Coffee.objects.filter(Q(city__id__in=allCities) & Q(expires__gt=timezone.now()))

    return card_types.ThirdAnnotateResponse(countries=countries,  usersNow=usersNow, usersBefore=usersBefore, continent=continent, coffees=coffees)


@login_required
def resolve_continent_users_now(self, info, **kwargs):

    user = info.context.user
    continentName = kwargs.get('continentName')
    page = kwargs.get('page', 0)
    offset = 20 * page

    nextPage = page+1

    usersNow = User.objects.filter(
        profile__current_city__country__continent__continent_name=continentName).order_by('-id').distinct('id')

    hasNextPage = offset < usersNow.count()

    usersNow = usersNow[offset:20 + offset]

    return card_types.UsersNowResponse(usersNow=usersNow,  page=nextPage, hasNextPage=hasNextPage)


@login_required
def resolve_continent_users_before(self, info, **kwargs):

    user = info.context.user
    continentName = kwargs.get('continentName')
    page = kwargs.get('page', 0)
    offset = 20 * page

    nextPage = page+1

    usersBefore = notification_models.MoveNotification.objects.filter(
        city__country__continent__continent_name=continentName).order_by('-actor_id').distinct('actor_id')

    hasNextPage = offset < usersBefore.count()

    usersBefore = usersBefore[offset:20 + offset]

    return card_types.usersBeforeResponse(usersBefore=usersBefore,  page=nextPage, hasNextPage=hasNextPage)


@login_required
def resolve_get_footprints(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 10 * page

    trip = user.movenotification.all().order_by('-start_date')[offset:10 + offset]

    return types.TripResponse(trip=trip)


@login_required
def resolve_near_cities(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')

    city = models.City.objects.prefetch_related('near_city').prefetch_related('near_cities').get(city_name=cityName)

    def get_locations_nearby_coords(latitude, longitude, max_distance=None):

        gcd_formula = "6371 * acos(cos(radians(%s)) * \
        cos(radians(latitude)) \
        * cos(radians(longitude) - radians(%s)) + \
        sin(radians(%s)) * sin(radians(latitude)))"
        distance_raw_sql = RawSQL(
            gcd_formula,
            (latitude, longitude, latitude)
        )
        near_cities_from_here = city.near_city.all().annotate(distance=distance_raw_sql)[:6]
        near_cities_from_there = city.near_cities.all().annotate(distance=distance_raw_sql)[:6]

        qs = near_cities_from_here.union(near_cities_from_there).order_by('distance')[:6]
        return qs

    combined = get_locations_nearby_coords(city.latitude, city.longitude)

    return types.CitiesResponse(cities=combined)


@login_required
def resolve_near_countries(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')

    city = models.City.objects.prefetch_related('near_country').get(city_name=cityName)
    countries = city.near_country.all()[:6]

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
