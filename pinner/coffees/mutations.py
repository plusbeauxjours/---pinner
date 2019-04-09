import graphene
from django.db import IntegrityError
from . import models, types
from graphql_jwt.decorators import login_required
from notifications import models as notification_models
from locations import models as location_models


class GetCoffee(graphene.Mutation):

    class Arguments:
        caption = graphene.String(required=True)

    Output = types.GetCoffeeResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user
        city = user.profile.current_city
        country = user.profile.current_city.country

        caption = kwargs.get('caption')

        try:
            country = location_models.Country.objects.get(country_name=country)
            city = location_models.City.objects.get(city_name=city)
            card = models.Card.objects.create(
                creator=user,
                caption=caption,
                city=city,
                country=country,
            )
            notification_models.Notification.objects.create(
                actor=user, verb="upload", payload=card
            )
            return types.GetCoffeeResponse(ok=True, card=card)
        except IntegrityError as e:
            print(e)
            raise Exception("Can't create a coffee")
