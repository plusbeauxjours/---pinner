from django.db import IntegrityError
from . import types, models
from graphql_jwt.decorators import login_required
from locations import models as location_models


@login_required
def resolve_get_coffees(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')
    coffeePage = kwargs.get('coffeePage', 0)

    city = location_models.City.objects.get(city_name=cityName)
    profile = user.profile
    followings = profile.followed_by.all()
    print(followings)

    everyone = city.coffee.filter(status='requesting', target='everyone')
    nationality = city.coffee.filter(status='requesting', target='nationality',
                                     host__profile__nationality=profile.nationality)
    gender = city.coffee.filter(status='requesting', target='gender', host__profile__gender=profile.gender)
    followers = city.coffee.filter(status='requesting', target='followers', host__profile__in=followings)

    if (coffeePage is 0):
        combined = everyone.union(nationality).union(gender).union(followers).order_by(
            '-created_at')[:6]
    else:
        combined = everyone.union(nationality).union(gender).union(followers).order_by(
            '-created_at')[6:]

    return types.GetCoffeesResponse(coffees=combined)


@login_required
def resolve_coffee_detail(self, info, **kwargs):

    coffeeId = kwargs.get('coffeeId')
    user = info.context.user

    if coffeeId:
        try:
            coffee = models.Coffee.objects.get(id=coffeeId)
        except models.Coffee.DoesNotExist:
            raise Exception('coffee not found')

    return types.CoffeeDetailResponse(coffee=coffee)
