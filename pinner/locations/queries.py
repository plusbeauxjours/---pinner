from django.db import IntegrityError
from . import types, models
from graphql_jwt.decorators import login_required


@login_required
def resolve_location(self, info, **kwargs):

    country = models.Country.objects.all()
    city = models.City.objects.all

    return types.LocationResponse(country=country, city=city)
