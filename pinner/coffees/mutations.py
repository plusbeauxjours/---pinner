import graphene
from django.db import IntegrityError
from . import models, types
from graphql_jwt.decorators import login_required
from locations import models as location_models


class RequestCoffee(graphene.Mutation):

    class Arguments:
        currentCity = graphene.String(required=True)
        currentCountry = graphene.String(required=True)

    Output = types.RequestCoffeeResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user
        currentCity = kwargs.get('currentCity')
        currentCountry = kwargs.get('currentCountry')

        try:
            currentCity = location_models.City.objects.get(city_name=currentCity)
            print(currentCity)
            coffee = models.Coffee.objects.create(
                city=currentCity,
                host=user
            )
            return types.RequestCoffeeResponse(ok=True, coffee=coffee)
        except IntegrityError as e:
            print(e)
            raise Exception("Can't create a coffee")
