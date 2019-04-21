from django.db import IntegrityError
from . import types, models
from django.contrib.auth.models import User
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
    matches = user.host.all()

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
def resolve_get_my_coffee(self, info, **kwargs):

    username = kwargs.get('username')
    user = info.context.user

    if user.is_authenticated:

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return types.GetMyCoffeeResponse(coffees=None)

        try:
            coffees = models.Coffee.objects.filter(host=user)
            return types.GetMyCoffeeResponse(coffees=coffees)
        except models.Coffee.DoesNotExist:
            return types.GetMyCoffeeResponse(coffees=None)

    else:
        return types.GetMyCoffeeResponse(coffees=None)


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


@login_required
def resolve_get_matches(self, info, **kwargs):

    user = info.context.user
    matchPage = kwargs.get('matchPage', 0)

    host = user.host.all()
    guest = user.guest.all()

    if (matchPage is 0):
        combined = host.union(guest).order_by('-created_at')[:20]
    else:
        combined = host.union(guest).order_by('-created_at')[20:]

    return types.GetMatchesResponse(matches=combined)
