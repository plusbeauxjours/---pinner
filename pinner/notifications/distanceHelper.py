from math import radians, degrees, sin, cos, asin, acos, sqrt

from . import models
from locations import models as location_models


def get_total_distance(username):
    trips = models.MoveNotification.objects.filter(actor__username=username).order_by('-start_date', '-created_at')
    distance = 0
    for x in range(len(trips)):
        print(x)
        lon1, lat1, lon2, lat2 = map(
            radians, [trips[x].city.longitude, trips[x].city.latitude, trips[x+1].city.longitude, trips[x+1].city.latitude])
        dist = 6371 * (
            acos(sin(lat1) * sin(lat2) + cos(lat1) * cos(lat2) * cos(lon1 - lon2))
        )
        print(dist, trips[x].city.city_name, trips[x+1].city.city_name)
        print(dist)
        distance += dist
        print(distance)
