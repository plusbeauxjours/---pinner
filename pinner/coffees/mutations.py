import graphene
from django.db import IntegrityError
from django.contrib.auth.models import User
from . import models, types
from graphql_jwt.decorators import login_required
from locations import models as location_models


class RequestCoffee(graphene.Mutation):

    class Arguments:
        currentCity = graphene.String(required=True)
        currentCountry = graphene.String(required=True)
        target = graphene.String()

    Output = types.RequestCoffeeResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user
        currentCity = kwargs.get('currentCity')
        currentCountry = kwargs.get('currentCountry')
        target = kwargs.get('target', 'everyone')

        try:
            currentCity = location_models.City.objects.get(city_name=currentCity)
            print(currentCity, currentCountry, target)
            coffee = models.Coffee.objects.create(
                city=currentCity,
                host=user,
                target=target,
            )
            return types.RequestCoffeeResponse(ok=True, coffee=coffee)
        except IntegrityError as e:
            print(e)
            raise Exception("Can't create a coffee")


class GetMatch(graphene.Mutation):

    class Arguments:
        coffeeId = graphene.String(required=True)
        userId = graphene.Int(required=True)

    Output = types.RequestCoffeeResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user
        coffeeId = kwargs.get('coffeeId')
        userId = kwargs.get('userId')

        try:
            guest = User.objects.get(id=userId)
        except User.DoesNotExist:
            raise Exception('User Not Found')

        try:
            coffee = models.Coffee.objects.get(id=coffeeId)
            print(coffee)
            match = models.Match.objects.create(
                host=coffee.host,
                city=coffee.city,
                guest=guest)
            return types.RequestCoffeeResponse(ok=True, match=match)
        except IntegrityError as e:
            print(e)
            raise Exception("Can't create a match")
