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
        cityPhotoURL = graphene.String(required=True)

    Output = types.ReportLocationResponse

    @login_required
    def mutate(self, info, **kwargs):
        user = info.context.user
        currentLat = kwargs.get('currentLat')
        currentLng = kwargs.get('currentLng')
        currentCity = kwargs.get('currentCity')
        currentCountry = kwargs.get('currentCountry')
        currentCountryCode = kwargs.get('currentCountryCode')
        cityPhotoURL = kwargs.get('cityPhotoURL')

        try:
            profile = user.profile

            if (currentCity != profile.current_city.city_name):

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
                    existing_country = models.Country.objects.get(country_name=currentCountry)

                    profile.current_country = existing_country

                    try:
                        existing_city = models.City.objects.get(city_name=currentCity)

                        if (not existing_city.city_photo):
                            existing_city.city_photo = cityPhotoURL
                            existing_city.save()
                            print(existing_city.city_photo)

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
                        print(cityPhotoURL.value())
                        new_city = models.City.objects.create(
                            city_name=currentCity, country=existing_country, city_photo=cityPhotoURL)
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
                        country_code=currentCountryCode, country_name=currentCountry)
                    new_country.save()
                    new_city = models.City.objects.create(
                        city_name=currentCity, country=new_country, city_photo=cityPhotoURL)
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
