from django.db import IntegrityError
from . import types, models
from graphql_jwt.decorators import login_required
from locations import models as location_models


@login_required
def resolve_get_coffee(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')

    city = location_models.objects.get(city_name=cityName)
    followings = user.followed_by.all()
    print(followings)

    everyone = city.coffee.filter(target='everyone')
    nationality = city.coffee.filter(target='nationality', host__nationality=user.natinality)
    gender = city.coffee.filter(target='gender', host__gender=user.gender)
    followers = city.coffee.filter(target='followers', host__in=followings)

    combined = following_cards.union(city_cards).union(my_cards).order_by(
        '-created_at')

    return types.GetCoffeeResponse(coffees=combined)
