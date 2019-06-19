import requests
import json
from django.conf import settings


def reverse_place(placeId):
    url = ('https://maps.googleapis.com/maps/api/geocode/json?&language=en&place_id={}&key={}'
           .format(placeId, settings.GOOGLE_MAPS_KEY))
    try:
        response = requests.get(url)
        resp_json_payload = response.json()
        lat = resp_json_payload['results'][0]['geometry']['location']['lat']
        lng = resp_json_payload['results'][0]['geometry']['location']['lng']
        print(lat, lng)
        for component in resp_json_payload['results'][0]['address_components']:
            if component['types'][0] == 'country':
                country_code = component['short_name']
                print(country_code)
                # return country_code
        for components in resp_json_payload['results']:
            print(components)
            for component in components['address_components']:
                print(component)
                print(component['types'][0])

                if component['types'][0] == 'locality' or component['types'][0] == 'sublocality' or component['types'][0] == 'colloquial_area':
                    city_name = component['long_name']
                    print('nani')
                    print(component['long_name'])
                    print(city_name)
                    # return city_name
        return lat, lng, city_name,  country_code
    except:
        print('ERROR: {}'.format(placeId))
        lat = 0
        lng = 0
        city_name = ""
        country_code = ""
    return lat, lng, city_name,  country_code
