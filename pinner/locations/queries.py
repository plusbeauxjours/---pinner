from django.db import IntegrityError
from . import types, models
from graphql_jwt.decorators import login_required


@login_required
def resolve_get_country(self, info, **kwargs):

    country = models.Country.objects.all()

    return types.CountryResponse(country=country)


@login_required
def resolve_get_city(self, info, **kwargs):

    city = models.City.objects.all()

    return types.CityResponse(city=city)
