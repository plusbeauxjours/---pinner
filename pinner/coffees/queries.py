from django.db import IntegrityError
from . import types, models
from django.contrib.auth.models import User
from graphql_jwt.decorators import login_required
from locations import models as location_models
from django.utils import timezone
from django.db.models import Q


@login_required
def resolve_get_coffees(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')
    coffeePage = kwargs.get('coffeePage', 0)

    city = location_models.City.objects.get(city_name=cityName)
    profile = user.profile
    followings = profile.followed_by.all()
    matches = user.guest.all()

    if (coffeePage is 0):
        coffees = city.coffee.filter((Q(target='everyone') |
                                      Q(target='nationality', host__profile__nationality=profile.nationality) |
                                      Q(target='gender', host__profile__gender=profile.gender) |
                                      Q(target='followers', host__profile__in=followings)) &
                                     Q(expires__gt=timezone.now())).exclude(match__in=matches).order_by('-created_at')[:6]
    else:
        coffees = city.coffee.filter((Q(target='everyone') |
                                      Q(target='nationality', host__profile__nationality=profile.nationality) |
                                      Q(target='gender', host__profile__gender=profile.gender) |
                                      Q(target='followers', host__profile__in=followings)) &
                                     Q(expires__gt=timezone.now())).exclude(match__in=matches).order_by('-created_at')[6:]

    return types.GetCoffeesResponse(coffees=coffees)


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
            coffees = user.coffee.filter(expires__lt=timezone.now()).order_by(
                '-created_at')
            requesting_coffees = models.Coffee.objects.filter(host=user, expires__gt=timezone.now()).order_by(
                '-created_at')
            return types.GetMyCoffeeResponse(coffees=coffees, requesting_coffees=requesting_coffees)
        except models.Coffee.DoesNotExist:
            return types.GetMyCoffeeResponse(expired_coffees=None, requesting_coffees=None)

    else:
        raise Exception('You need to log in')


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
