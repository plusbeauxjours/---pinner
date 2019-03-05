from django.db import IntegrityError
from . import types, models
from graphql_jwt.decorators import login_required


@login_required
def resolve_get_countries(self, info, **kwargs):

    countries = models.Country.objects.all().order_by(
        '-created_at')

    return types.CountriesResponse(countries=countries)


@login_required
def resolve_get_cities(self, info, **kwargs):

    cities = models.City.objects.all().order_by(
        '-created_at')

    return types.CitiesResponse(cities=cities)


@login_required
def resolve_get_footprints(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 10 * page

    footprints = user.locationlogs.all().order_by('-created_at')[offset:10 + offset]

    return types.FootprintsResponse(footprints=footprints)


@login_required
def resolve_get_users_by_city(self, info, **kwargs):

    user = info.context.user
    cityname = kwargs.get('cityname')

    location_logs = models.LocationLog.objects.filter(
        city__cityname=cityname).order_by('-creator').distinct('creator')

    return types.GetUsersByCityResponse(ok=True, location_logs=location_logs)
