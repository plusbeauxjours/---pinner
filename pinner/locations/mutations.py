import graphene
from django.db import IntegrityError
from django.contrib.auth.models import User
from graphql_jwt.decorators import login_required

import googlemaps 

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
        countryPhotoURL = graphene.String(required=True)
        continentPhotoURL = graphene.String(required=True)
        currentContinent = graphene.String(required=True)

    Output = types.ReportLocationResponse

    @login_required
    def mutate(self, info, **kwargs):
        user = info.context.user
        profile = user.profile

        currentLat = kwargs.get('currentLat')
        currentLng = kwargs.get('currentLng')
        currentCity = kwargs.get('currentCity')
        currentCountry = kwargs.get('currentCountry')
        currentCountryCode = kwargs.get('currentCountryCode')
        cityPhotoURL = kwargs.get('cityPhotoURL')
        countryPhotoURL = kwargs.get('countryPhotoURL')
        continentPhotoURL = kwargs.get('continentPhotoURL')
        currentContinent = kwargs.get('currentContinent')

        gmaps = googlemaps.Client(key='AIzaSyDpOezMBjAdXKzLdT4E54XsRRYVXacckUE') 

        print('reportlocation')

        print('currentCity:',currentCity)
        cities = models.City.objects.all()
        currentLocation = [currentLat, currentLng]
        
        for i in cities:
            
            targetLocation = [i.lat, i.lng]
            print('targetCity:',targetLocation)
            distance = gmaps.distance_matrix(["{} {}".format(currentLocation[0],currentLocation[1])], ["{} {}".format(targetLocation[0],targetLocation[1])]language="en",)['rows'][0]['elements'][0]
     
            print(distance['distance']['text'])

            # print(my_dist['rows'][0]['elements'][0]['distance']['text'])
            # print(my_dist['origin_addresses'][0],my_dist['destination_addresses'][0])




        try:
            continent = models.Continent.objects.get(continent_name=currentContinent)
        except models.Continent.DoesNotExist:
            continent = models.Continent.objects.create(
                continent_name=currentContinent, continent_photo=continentPhotoURL)

        try:
            country = models.Country.objects.get(country_name=currentCountry)
        except models.Country.DoesNotExist:
            country = models.Country.objects.create(
                country_code=currentCountryCode, country_name=currentCountry, country_photo=countryPhotoURL, continent=continent)
        try:
            city = models.City.objects.get(city_name=currentCity)
            profile.current_city = city
            profile.save()

        except models.City.DoesNotExist:
            nearCities = models.City.objects.filter(city_name=currentCity)
            city = models.City.objects.create(
                city_name=currentCity, country=country, city_photo=cityPhotoURL, lat=currentLat, lng=currentLng)
            profile.current_city = city
            profile.save()

        # try:
        #     nearCities = models.City.objects.filter(city_name=currentCity)

        try:
            latest = user.movenotification.latest('created_at')
            if not latest.city == city:
                notification_models.MoveNotification.objects.create(actor=user, city=city)
        except notification_models.MoveNotification.DoesNotExist:
            notification_models.MoveNotification.objects.create(actor=user, city=city)

        return types.ReportLocationResponse(ok=True)
