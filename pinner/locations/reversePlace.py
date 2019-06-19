import requests
import json
from django.conf import settings


def reverse_place(placeId):

    url = ('https://maps.googleapis.com/maps/api/geocode/json?address={}&key={}'
           .format(placeId, settings.GOOGLE_PLACE_KEY))
    try:
        response = requests.get(url)
        resp_json_payload = response.json()
        lat = resp_json_payload['results'][0]['geometry']['location']['lat']
        lng = resp_json_payload['results'][0]['geometry']['location']['lng']
        city_name = ""
        country_code = ""
    except:
        print('ERROR: {}'.format(placeId))
        lat = 0
        lng = 0
        city_name = ""
        country_code = ""
    return lat, lng

    placeId = 'ChIJzWXFYYuifDUR64Pq5LTtioU'
    lat, lng, city_name, city_name, country_code = reverse_place(placeId)
    print('{} Coordinates:\nLatitude:  {}° \nLongitude: {}° \nCityName: {} \nCountryCode: {}'.format(
        placeId, lat, lng, city_name, country_code))
