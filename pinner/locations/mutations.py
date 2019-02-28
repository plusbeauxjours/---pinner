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

            if (currentCity != profile.currentCity.cityname):

                try:
                    profile.lastLat = profile.currentLat
                    profile.lastLng = profile.currentLng
                    profile.lastCity = profile.currentCity
                    profile.lastCountry = profile.currentCountry
                except:
                    pass

                profile.currentLat = currentLat
                profile.currentLng = currentLng

                try:
                    existing_country = models.Country.objects.get(countryname=currentCountry)

                    profile.currentCountry = existing_country

                    try:
                        existing_city = models.City.objects.get(cityname=currentCity)

                        profile.currentCity = existing_city
                        profile.save()
                        notification_models.MoveNotification.objects.create(
                            actor=user,
                            verb="move",
                            fromCity=profile.lastCity,
                            fromCountry=profile.lastCountry,
                            toCity=profile.currentCity,
                            toCountry=profile.currentCountry
                        )
                        models.LocationLog.objects.create(
                            creator=user,
                            city=profile.currentCity,
                            country=profile.currentCountry
                        )
                        return types.ReportLocationResponse(ok=True)

                    except:
                        new_city = models.City.objects.create(cityname=currentCity, country=existing_country)
                        new_city.save()

                        profile.currentCity = new_city
                        profile.save()
                        notification_models.MoveNotification.objects.create(
                            actor=user,
                            verb="move",
                            fromCity=profile.lastCity,
                            fromCountry=profile.lastCountry,
                            toCity=profile.currentCity,
                            toCountry=profile.currentCountry
                        )
                        models.LocationLog.objects.create(
                            creator=user,
                            city=profile.currentCity,
                            country=profile.currentCountry
                        )

                except:
                    new_country = models.Country.objects.create(
                        countrycode=currentCountryCode, countryname=currentCountry)
                    new_country.save()
                    new_city = models.City.objects.create(cityname=currentCity, country=new_country)
                    new_city.save()

                    profile.currentCity = new_city
                    profile.currentCountry = new_country
                    profile.save()
                    notification_models.MoveNotification.objects.create(
                        actor=user,
                        verb="move",
                        fromCity=profile.lastCity,
                        fromCountry=profile.lastCountry,
                        toCity=profile.currentCity,
                        toCountry=profile.currentCountry
                    )
                    models.LocationLog.objects.create(
                        creator=user,
                        city=profile.currentCity,
                        country=profile.currentCountry
                    )

                return types.ReportLocationResponse(ok=True)

            return types.ReportLocationResponse(ok=True)

        except profile.DoesNotExist:
            raise Exception('Profile not found')
