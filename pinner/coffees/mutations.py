import graphene
from django.db import IntegrityError
from django.contrib.auth.models import User
from . import models, types
from graphql_jwt.decorators import login_required
from locations import models as location_models
from notifications import models as notification_models
from django.utils import timezone


class RequestCoffee(graphene.Mutation):

    class Arguments:
        currentCityId = graphene.String(required=True)
        target = graphene.String()

    Output = types.RequestCoffeeResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user
        currentCityId = kwargs.get('currentCityId')
        target = kwargs.get('target', 'everyone')

        if not user.coffee.filter(expires__gt=timezone.now()):

            try:
                currentCity = location_models.City.objects.get(city_id=currentCityId)

                coffee = models.Coffee.objects.create(
                    city=currentCity,
                    host=user,
                    target=target,
                )
                return types.RequestCoffeeResponse(ok=True, coffee=coffee)

            except IntegrityError as e:
                print(e)
                raise Exception("Can't create a coffee")

        else:
            raise Exception("You can't request more than one coffee")


class DeleteCoffee(graphene.Mutation):

    class Arguments:
        coffeeId = graphene.String(required=True)

    Output = types.DeleteCoffeeResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user
        coffeeId = kwargs.get('coffeeId')

        try:
            coffee = models.Coffee.objects.get(uuid=coffeeId)
        except models.Coffee.DoesNotExist:
            return types.DeleteCoffeeResponse(ok=False, coffeeId=None, username=user.username)

        if coffee.host.id == user.id:

            coffee.delete()
            return types.DeleteCoffeeResponse(ok=True, coffeeId=coffeeId, username=user.username)

        else:
            return types.DeleteCoffeeResponse(ok=False, coffeeId=None, username=user.username)


class Match(graphene.Mutation):

    class Arguments:
        coffeeId = graphene.String(required=True)

    Output = types.MatchResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user
        coffeeId = kwargs.get('coffeeId')

        try:
            coffee = models.Coffee.objects.get(uuid=coffeeId)
            cityId = coffee.city.city_id
            countryCode = coffee.city.country.country_code
            continentCode = coffee.city.country.continent.continent_code
            match = models.Match.objects.create(
                host=coffee.host,
                city=coffee.city,
                guest=user,
                coffee=coffee
            )
            notification_models.Notification.objects.create(
                verb="match",
                actor=user,
                target=coffee.host,
                match=match
            )
            return types.MatchResponse(ok=True, match=match, coffeeId=coffeeId, cityId=cityId, countryCode=countryCode,
                                       continentCode=continentCode)
        except IntegrityError as e:
            print(e)
            raise Exception("Can't create a match")


class UnMatch(graphene.Mutation):

    class Arguments:
        matchId = graphene.String(required=True)

    Output = types.UnMatchResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user
        matchId = kwargs.get('matchId')

        try:
            match = models.Match.objects.get(id=matchId)
        except models.Match.DoesNotExist:
            return types.UnMatchResponse(ok=False, matchId=None, coffee=None, cityId=None, countryCode=None,
                                         continentCode=None)

        try:
            coffee = match.coffee
        except models.Match.DoesNotExist:
            return types.UnMatchResponse(ok=False, matchId=None, coffee=None, cityId=None, countryCode=None,
                                         continentCode=None)

        if match.host.id == user.id or match.guest.id == user.id:
            cityId = match.city.city_id
            countryCode = match.city.country.country_code
            continentCode = match.city.country.continent.continent_code
            match.delete()
            return types.UnMatchResponse(ok=True, matchId=matchId, coffee=coffee, cityId=cityId, countryCode=countryCode,
                                         continentCode=continentCode)

        else:
            return types.UnMatchResponse(ok=False, matchId=None, coffee=None, cityId=None, countryCode=None,
                                         continentCode=None)


class MarkAsReadMatch(graphene.Mutation):

    class Arguments:
        matchId = graphene.String(required=True)

    Output = types.MarkAsReadMatchResponse

    @login_required
    def mutate(self, info, **kwargs):

        matchId = kwargs.get('matchId')
        user = info.context.user

        try:
            match = models.Match.objects.get(
                id=matchId
            )
            if user is match.host:
                print('im host')
                match.is_read_by_host = True
                match.save()
                return types.MarkAsReadResponse(ok=True, matchId=matchId)
            elif user is match.guest:
                print('im guest')
                match.is_read_by_guest = True
                match.save()
                return types.MarkAsReadResponse(ok=True, matchId=matchId)
            else:
                return types.MarkAsReadResponse(ok=False, matchId=None)

        except models.Match.DoesNotExist:
            raise Exception('This match is already unmatched ')
