from django.db import IntegrityError
from . import types, models
from graphql_jwt.decorators import login_required


@login_required
def resolve_get_coffee_by_city(self, info, **kwargs):

    username = kwargs.get('username')
    profile = User.objects.get(username=username)

    cities = profile.movenotification.all().order_by('city').distinct('city')

    return types.GetCoffeeResponse(footprints=cities)


@login_required
def resolve_get_coffee_by_gender(self, info, **kwargs):

    username = kwargs.get('username')
    profile = User.objects.get(username=username)

    cities = profile.movenotification.all().order_by('city').distinct('city')

    return types.GetCoffeeResponse(footprints=cities)


@login_required
def resolve_get_coffee_by_nationality(self, info, **kwargs):

    username = kwargs.get('username')
    profile = User.objects.get(username=username)

    cities = profile.movenotification.all().order_by('city').distinct('city')

    return types.GetCoffeeResponse(footprints=cities)


@login_required
def resolve_get_coffee_to_followers(self, info, **kwargs):

    username = kwargs.get('username')
    profile = User.objects.get(username=username)

    cities = profile.movenotification.all().order_by('city').distinct('city')

    return types.GetCoffeeResponse(footprints=cities)
