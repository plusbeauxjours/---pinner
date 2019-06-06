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
    me = info.context.user

    location = kwargs.get('location')
    cityName = kwargs.get('cityName')
    userName = kwargs.get('userName')

    if location == "feed":
        try:
            city = location_models.City.objects.prefetch_related('coffee').get(city_name=cityName)
        except location_models.City.DoesNotExist:
            return types.GetCoffeesResponse(coffees=None)

        try:
            profile = me.profile
            matches = me.guest.values('id').all()

            # matches = me.host.values('id').values('guest').all()
            # not allow to join. only showing is allowed if they already matched

            coffees = city.coffee.filter((Q(target='everyone') |
                                          Q(target='nationality', host__profile__nationality=profile.nationality) |
                                          Q(target='gender', host__profile__gender=profile.gender)) &
                                         Q(expires__gt=timezone.now())).exclude(match__id__in=matches).order_by('-created_at')

            return types.GetCoffeesResponse(coffees=coffees)

        except models.Coffee.DoesNotExist:
            return types.GetCoffeesResponse(coffees=None)

    elif location == "profile":
        try:
            user = User.objects.prefetch_related('coffee').get(username=userName)
            print(user)
        except User.DoesNotExist:
            return types.GetCoffeesResponse(coffees=None)

        try:
            coffees = models.Coffee.objects.filter(host=user, expires__gt=timezone.now()).order_by(
                '-created_at')
            print(coffees)
            return types.GetCoffeesResponse(coffees=coffees)

        except models.Coffee.DoesNotExist:
            return types.GetCoffeesResponse(coffees=None)

    elif location == "history":
        try:
            user = User.objects.prefetch_related('coffee').get(username=userName)
        except User.DoesNotExist:
            return types.GetCoffeesResponse(coffees=None)

        if(me.username == userName):
            try:
                coffees = user.coffee.all()
                return types.GetCoffeesResponse(coffees=coffees)
            except models.Coffee.DoesNotExist:
                return types.GetCoffeesResponse(coffees=None)
        else:
            return types.GetCoffeesResponse(coffees=None)


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
