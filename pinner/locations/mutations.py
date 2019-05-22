import graphene
import json
from django.db import IntegrityError
from django.db.models import Q
from django.db.models.expressions import RawSQL
from django.contrib.auth.models import User
from graphql_jwt.decorators import login_required

from . import models, types
from . import locationThumbnail
from notifications import models as notification_models


class ReportLocation(graphene.Mutation):

    class Arguments:
        currentLat = graphene.Float(required=True)
        currentLng = graphene.Float(required=True)
        currentCity = graphene.String(required=True)
        currentCountryCode = graphene.String(required=True)
        currentContinent = graphene.String(required=True)

    Output = types.ReportLocationResponse

    @login_required
    def mutate(self, info, **kwargs):
        user = info.context.user
        profile = user.profile

        currentLat = kwargs.get('currentLat')
        currentLng = kwargs.get('currentLng')
        currentCity = kwargs.get('currentCity')
        currentCountryCode = kwargs.get('currentCountryCode')
        currentContinent = kwargs.get('currentContinent')

        print('reportlocation')

        def get_locations_nearby_coords(latitude, longitude, max_distance=None):
            gcd_formula = "6371 * acos(cos(radians(%s)) * \
            cos(radians(latitude)) \
            * cos(radians(longitude) - radians(%s)) + \
            sin(radians(%s)) * sin(radians(latitude)))"
            distance_raw_sql = RawSQL(
                gcd_formula,
                (latitude, longitude, latitude)
            )
            qs = models.City.objects.all().annotate(distance=distance_raw_sql).order_by('distance')
            if max_distance is not None:
                qs = qs.filter(Q(distance__lt=max_distance) | Q(distance__gt=0))
            return qs

        try:
            continent = models.Continent.objects.get(continent_name=currentContinent)
        except models.Continent.DoesNotExist:
            continent = models.Continent.objects.create(
                continent_name=currentContinent, continent_photo=continentPhotoURL)

        try:
            country = models.Country.objects.get(country_code=currentCountryCode)
        except models.Country.DoesNotExist:
            locationThumbnail.get_photos(term=currentCountryCode)






            # country = models.Country.objects.create(
            #     country_code=currentCountryCode, country_name=currentCountry, country_photo=countryPhotoURL, continent=continent)

        try:
            city = models.City.objects.get(city_name=currentCity)
            print("what")
            profile.current_city = city
            profile.save()
            if city.near_city.count() < 6 :
                nearCities = get_locations_nearby_coords(currentLat, currentLng, 3000)[:6]
                for i in nearCities:
                    city.near_city.add(i)
                    city.save()

        except models.City.DoesNotExist:
            nearCities = get_locations_nearby_coords(currentLat, currentLng, 3000)[:6]
            city = models.City.objects.create(
                city_name=currentCity, country=country, city_photo=cityPhotoURL, latitude=currentLat, longitude=currentLng)
            for i in nearCities:
                city.near_city.add(i)
                city.save()
            profile.current_city = city
            profile.save()
            return city
        
        try:
            print(city)
            latest = user.movenotification.latest('created_at')
            if not latest.city == city:
                notification_models.MoveNotification.objects.create(actor=user, city=city)
        except notification_models.MoveNotification.DoesNotExist:
            notification_models.MoveNotification.objects.create(actor=user, city=city)

        return types.ReportLocationResponse(ok=True)



class ToggleLikeCity(graphene.Mutation):

    """ Like a City """

    class Arguments:
        cityId = graphene.Int(required=True)

    Output = types.ToggleLikeCityResponse

    @login_required
    def mutate(self, info, **kwargs):

        cityId = kwargs.get('cityId')
        user = info.context.user

        try:
            city = models.City.objects.get(id=cityId)
        except models.City.DoesNotExist:
            raise Exception("City Not Found")

        try:
            like = models.Like.objects.get(
                creator=user, city=city)
            like.delete()
            return types.ToggleLikeCityResponse(ok=True, city=city)

        except models.Like.DoesNotExist:
            pass

        try:
            like = models.Like.objects.create(
                creator=user, city=city)
            return types.ToggleLikeCityResponse(ok=True, city=city)

        except IntegrityError as e:
            raise Exception("Can't Like City")
