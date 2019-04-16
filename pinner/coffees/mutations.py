import graphene
from django.db import IntegrityError
from django.contrib.auth.models import User
from . import models, types
from graphql_jwt.decorators import login_required
from locations import models as location_models
from notifications import models as notification_models


class RequestCoffee(graphene.Mutation):

    class Arguments:
        currentCity = graphene.String(required=True)
        currentCountry = graphene.String(required=True)
        target = graphene.String()
        caption =graphene.String()

    Output = types.RequestCoffeeResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user
        currentCity = kwargs.get('currentCity')
        currentCountry = kwargs.get('currentCountry')
        target = kwargs.get('target', 'everyone')
        caption = kwargs.get('caption')

        try:
            currentCity = location_models.City.objects.get(city_name=currentCity)
            print(currentCity, currentCountry, target)
            coffee = models.Coffee.objects.create(
                city=currentCity,
                host=user,
                target=target,
                caption=caption
            )
            notification_models.CoffeeNotification.objects.create(
                verb="coffee",
                city=currentCity,
                host=user,
                target=target,
                payload=coffee
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
                guest=user
            )
            notification_models.MatchNotification.objects.create(
                verb="match",
                city=coffee.city,
                host=coffee.host,
                guest=user,
                payload=match
            )
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
            except models.Match.DoesNotExist:
                return types.UnMatchResponse(ok=False)

            if match.host.id == user.id or match.guest.id == user.id:
                match.delete()
                return types.UnMatchResponse(ok=True)

            else:

                return types.UnMatchResponse(ok=False)

        else:
            return types.UnMatchResponse(ok=False)
