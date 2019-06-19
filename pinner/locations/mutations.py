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


class CreateCity(graphene.Mutation):

    class Arguments:
        cityId = graphene.String(required=True)
        cityName = graphene.String(required=True)
        cityLatitude = graphene.Float(required=True)
        cityLongitude = graphene.Float(required=True)
        countryCode = graphene.String(required=True)

    Output = types.CreateCityResponse

    @login_required
    def mutate(self, info, **kwargs):
        user = info.context.user

        cityId = kwargs.get('cityId')
        cityName = kwargs.get('cityName')
        cityLatitude = kwargs.get('cityLatitude')
        cityLongitude = kwargs.get('cityLongitude')
        countryCode = kwargs.get('countryCode')

        print('createCity')

        def get_locations_nearby_coords(latitude, longitude, max_distance=3000):
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
                qs = qs.filter(Q(distance__lt=max_distance))
            return qs

        try:
            country = models.Country.objects.get(country_code=countryCode)
        except models.Country.DoesNotExist:
            with open('pinner/locations/countryData.json', mode='rt', encoding='utf-8') as file:
                countryData = json.load(file)
                currentCountry = countryData[countryCode]
                countryName = currentCountry['name']
                countryNameNative = currentCountry['native']
                countryCapital = currentCountry['capital']
                countryCurrency = currentCountry['currency']
                countryPhone = currentCountry['phone']
                countryEmoji = currentCountry['emoji']
                countryEmojiU = currentCountry['emojiU']
                continentCode = currentCountry['continent']

                try:
                    continent = models.Continent.objects.get(continent_code=continentCode)
                except:
                    with open('pinner/locations/continentData.json', mode='rt', encoding='utf-8') as file:
                        continentData = json.load(file)
                        continentName = continentData[continentCode]

                        try:
                            gp = locationThumbnail.get_photos(term=continentName)
                            continentPhotoURL = gp.get_urls()
                        except:
                            continentPhotoURL = None

                        # DOWNLOAD IMAGE
                        # continentPhotoURL = gp.get_urls()
                        # # for i in range(gp.num):
                        # #     print('Downloading...' + str(i) + '/' + str(gp.num))
                        # #     gp.download(i)

                        continent = models.Continent.objects.create(
                            continent_name=continentName,
                            continent_photo=continentPhotoURL,
                            continent_code=continentCode
                        )
            try:
                gp = locationThumbnail.get_photos(term=countryName)
                countryPhotoURL = gp.get_urls()
            except:
                countryPhotoURL = None

            # DOWNLOAD IMAGE
            # for i in range(gp.num):
            #     print('Downloading...' + str(i) + '/' + str(gp.num))
            #     gp.download(i)

            country = models.Country.objects.create(
                country_code=countryCode,
                country_name=countryName,
                country_name_native=countryNameNative,
                country_capital=countryCapital,
                country_currency=countryCurrency,
                country_phone=countryPhone,
                country_emoji=countryEmoji,
                country_emojiU=countryEmojiU,
                country_photo=countryPhotoURL,
                continent=continent,
            )
        try:
            city = models.City.objects.get(city_id=cityId)
            if city.near_city.count() < 20:
                nearCities = get_locations_nearby_coords(cityLatitude, cityLongitude, 3000)[:20]
                for i in nearCities:
                    city.near_city.add(i)
                    city.save()

        except models.City.DoesNotExist:
            nearCities = get_locations_nearby_coords(cityLatitude, cityLongitude, 3000)[:20]

            try:
                gp = locationThumbnail.get_photos(term=cityName)
                cityPhotoURL = gp.get_urls()
            except:
                cityPhotoURL = None

            # DOWNLOAD IMAGE
            # countryPhotoURL = gp.get_urls()
            # # for i in range(gp.num):
            # #     print('Downloading...' + str(i) + '/' + str(gp.num))
            # #     gp.download(i)
            city = models.City.objects.create(
                city_id=cityId,
                city_name=cityName,
                country=country,
                city_photo=cityPhotoURL,
                latitude=cityLatitude,
                longitude=cityLongitude
            )
            for i in nearCities:
                city.near_city.add(i)
                city.save()
        return types.CreateCityResponse(ok=True)


class ReportLocation(graphene.Mutation):

    class Arguments:
        currentLat = graphene.Float(required=True)
        currentLng = graphene.Float(required=True)
        currentCityId = graphene.String()
        currentCityName = graphene.String(required=True)
        currentCountryCode = graphene.String(required=True)

    Output = types.ReportLocationResponse

    @login_required
    def mutate(self, info, **kwargs):
        user = info.context.user
        profile = user.profile

        currentLat = kwargs.get('currentLat')
        currentLng = kwargs.get('currentLng')
        currentCityId = kwargs.get('currentCityId')
        currentCityName = kwargs.get('currentCityName')
        currentCountryCode = kwargs.get('currentCountryCode')

        print('reportlocation')

        def get_locations_nearby_coords(latitude, longitude, max_distance=3000):
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
                qs = qs.filter(Q(distance__lt=max_distance))
            return qs

        try:
            country = models.Country.objects.get(country_code=currentCountryCode)
        except models.Country.DoesNotExist:
            with open('pinner/locations/countryData.json', mode='rt', encoding='utf-8') as file:
                countryData = json.load(file)
                currentCountry = countryData[currentCountryCode]
                countryName = currentCountry['name']
                countryNameNative = currentCountry['native']
                countryCapital = currentCountry['capital']
                countryCurrency = currentCountry['currency']
                countryPhone = currentCountry['phone']
                countryEmoji = currentCountry['emoji']
                countryEmojiU = currentCountry['emojiU']
                continentCode = currentCountry['continent']

                try:
                    continent = models.Continent.objects.get(continent_code=continentCode)
                except:
                    with open('pinner/locations/continentData.json', mode='rt', encoding='utf-8') as file:
                        continentData = json.load(file)
                        continentName = continentData[continentCode]

                        try:
                            gp = locationThumbnail.get_photos(term=continentName)
                            continentPhotoURL = gp.get_urls()
                        except:
                            continentPhotoURL = None

                        # DOWNLOAD IMAGE
                        # continentPhotoURL = gp.get_urls()
                        # # for i in range(gp.num):
                        # #     print('Downloading...' + str(i) + '/' + str(gp.num))
                        # #     gp.download(i)

                        continent = models.Continent.objects.create(
                            continent_name=continentName,
                            continent_photo=continentPhotoURL,
                            continent_code=continentCode
                        )
            try:
                gp = locationThumbnail.get_photos(term=countryName)
                countryPhotoURL = gp.get_urls()
            except:
                countryPhotoURL = None

            # DOWNLOAD IMAGE
            # for i in range(gp.num):
            #     print('Downloading...' + str(i) + '/' + str(gp.num))
            #     gp.download(i)

            country = models.Country.objects.create(
                country_code=currentCountryCode,
                country_name=countryName,
                country_name_native=countryNameNative,
                country_capital=countryCapital,
                country_currency=countryCurrency,
                country_phone=countryPhone,
                country_emoji=countryEmoji,
                country_emojiU=countryEmojiU,
                country_photo=countryPhotoURL,
                continent=continent,
            )

        try:
            city = models.City.objects.get(city_id=currentCityId)
            profile.current_city = city
            profile.save()
            if city.near_city.count() < 20:
                nearCities = get_locations_nearby_coords(currentLat, currentLng, 3000)[:20]
                for i in nearCities:
                    city.near_city.add(i)
                    city.save()

        except models.City.DoesNotExist:
            nearCities = get_locations_nearby_coords(currentLat, currentLng, 3000)[:20]

            try:
                gp = locationThumbnail.get_photos(term=currentCityName)
                cityPhotoURL = gp.get_urls()
            except:
                cityPhotoURL = None

            # DOWNLOAD IMAGE
            # countryPhotoURL = gp.get_urls()
            # # for i in range(gp.num):
            # #     print('Downloading...' + str(i) + '/' + str(gp.num))
            # #     gp.download(i)

            city = models.City.objects.create(
                city_id=currentCityId,
                city_name=currentCityName,
                country=country,
                city_photo=cityPhotoURL,
                latitude=currentLat,
                longitude=currentLng
            )
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
