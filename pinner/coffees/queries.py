from django.db import IntegrityError
from . import types, models
from graphql_jwt.decorators import login_required
from locations import models as location_models


@login_required
def resolve_get_coffee(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')

    city = location_models.City.objects.get(city_name=cityName)
    profile = user.profile
    followings = profile.followed_by.all()
    print(followings)

    everyone = city.coffee.filter(target='everyone')
    nationality = city.coffee.filter(target='nationality', host__profile__nationality=profile.nationality)
    gender = city.coffee.filter(target='gender', host__profile__gender=profile.gender)
    followers = city.coffee.filter(target='followers', host__profile__in=followings)

    combined = everyone.union(nationality).union(gender).union(followers).order_by(
        '-created_at')

    return types.GetCoffeeResponse(coffees=combined)
