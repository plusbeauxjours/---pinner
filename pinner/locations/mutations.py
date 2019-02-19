import graphene
from django.db import IntegrityError
from django.contrib.auth.models import User
from graphql_jwt.decorators import login_required
from cards import models as cards_models
from . import models, types


class ReportLocation(graphene.Mutation):

    class Arguments:
        lastLng = graphene.Float(required=True)
        lastLat = graphene.Float(required=True)
        lastCity = graphene.String(required=True)
        lastCountry = graphene.String(required=True)

    Output = types.ReportLocationResponse

    @login_required
    def mutate(self, info, **kwargs):
        user = info.context.user
        lastLng = kwargs.get('lastLng')
        lastLat = kwargs.get('lastLat')
        lastCity = kwargs.get('lastCity')
        lastCountry = kwargs.get('lastCountry')

        try:
            profile = user.profile

            profile.lastLng = lastLng
            profile.lastLat = lastLat
            profile.lastCity = lastCity
            profile.lastCountry = lastCountry
            profile.save()
            user.save()

            try:
                existing_country = models.Country.objects.get(countryname=lastCountry)

                try:
                    existing_city = models.City.objects.get(cityname=lastCity)
                except:
                    new_city = models.City.objects.create(cityname=lastCity, country=existing_country)
                    new_city.save()

            except:
                new_country = models.Country.objects.create(countryname=lastCountry)
                new_country.save()
                new_city = models.City.objects.create(cityname=lastCity, country=new_country)
                new_city.save()

            return types.ReportLocationResponse(ok=True)

        except profile.DoesNotExist:
            raise Exception('Profile not found')
