from django.db import IntegrityError
from . import types, models
from graphql_jwt.decorators import login_required


@login_required
def resolve_get_countries(self, info, **kwargs):

    countries = models.Country.objects.all()

    return types.CountriesResponse(countries=countries)


@login_required
def resolve_get_cities(self, info, **kwargs):

    cities = models.City.objects.all()

    return types.CitiesResponse(cities=cities)
