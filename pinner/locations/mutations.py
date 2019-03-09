import graphene
from django.db import IntegrityError
from django.contrib.auth.models import User
from graphql_jwt.decorators import login_required

from . import models, types
from notifications import models as notification_models


class ReportLocation(graphene.Mutation):

    class Arguments:
        currentLat = graphene.Float(required=True)
        currentLng = graphene.Float(required=True)
        currentCity = graphene.String(required=True)
        currentCountry = graphene.String(required=True)
        currentCountryCode = graphene.String(required=True)

    Output = types.ReportLocationResponse

    @login_required
    def mutate(self, info, **kwargs):
        user = info.context.user
        currentLat = kwargs.get('currentLat')
        currentLng = kwargs.get('currentLng')
        currentCity = kwargs.get('currentCity')
        currentCountry = kwargs.get('currentCountry')
        currentCountryCode = kwargs.get('currentCountryCode')

        try:
            profile = user.profile

            if (currentCity != profile.current_city.cityname):

                try:
                    profile.last_lat = profile.current_lat
                    profile.last_lng = profile.current_lng
                    profile.last_city = profile.current_city
                    profile.last_country = profile.current_country
                except:
                    pass

                profile.current_lat = currentLat
                profile.current_lng = currentLng

                try:
                    existing_country = models.Country.objects.get(countryname=currentCountry)

                    profile.current_country = existing_country

                    try:
                        existing_city = models.City.objects.get(cityname=currentCity)

                        profile.current_city = existing_city
                        profile.save()

                        notification_models.MoveNotification.objects.create(
                            actor=user,
                            verb="move",
                            fromCity=profile.last_city,
                            fromCountry=profile.last_country,
                            toCity=profile.current_city,
                            toCountry=profile.current_country
                        )
                        return types.ReportLocationResponse(ok=True)

                    except:
                        new_city = models.City.objects.create(cityname=currentCity, country=existing_country)
                        new_city.save()

                        profile.current_city = new_city
                        profile.save()
                        notification_models.MoveNotification.objects.create(
                            actor=user,
                            verb="move",
                            fromCity=profile.last_city,
                            fromCountry=profile.last_country,
                            toCity=profile.current_city,
                            toCountry=profile.current_country
                        )
                        return types.ReportLocationResponse(ok=True)

                except:
                    new_country = models.Country.objects.create(
                        countrycode=currentCountryCode, countryname=currentCountry)
                    new_country.save()
                    new_city = models.City.objects.create(cityname=currentCity, country=new_country)
                    new_city.save()

                    profile.current_city = new_city
                    profile.current_country = new_country
                    profile.save()
                    notification_models.MoveNotification.objects.create(
                        actor=user,
                        verb="move",
                        fromCity=profile.last_city,
                        fromCountry=profile.last_country,
                        toCity=profile.current_city,
                        toCountry=profile.current_country
                    )
                return types.ReportLocationResponse(ok=True)

            return types.ReportLocationResponse(ok=True)

        except profile.DoesNotExist:
            raise Exception('Profile not found')
