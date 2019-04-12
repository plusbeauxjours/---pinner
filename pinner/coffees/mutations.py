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


class Match(graphene.Mutation):

    class Arguments:
        coffeeId = graphene.Int(required=True)

    Output = types.MatchResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user
        coffeeId = kwargs.get('coffeeId')

        try:
            coffee = models.Coffee.objects.get(id=coffeeId)
            print(coffee)
            match = models.Match.objects.create(
                host=coffee.host,
                city=coffee.city,
                guest=user)
            return types.MatchResponse(ok=True, match=match)
        except IntegrityError as e:
            print(e)
            raise Exception("Can't create a match")


class UnMatch(graphene.Mutation):

    class Arguments:
        matchId = graphene.Int(required=True)

    Output = types.UnMatchResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user
        matchId = kwargs.get('matchId')

        if user.is_authenticated:

            try:
                match = models.Match.objects.get(id=matchId)
            except models.Card.DoesNotExist:
                error = "Match Not Found"
                return types.UnMatchResponse(ok=False)

            if match.host.id == user.id or match.guest.id == user.id:

                match.delete()
                return types.UnMatchResponse(ok=True)

            else:

                error = "Unauthorized"
                return types.UnMatchResponse(ok=False)

        else:
            error = "You need to log in"
            return types.UnMatchResponse(ok=False)
