from math import radians, degrees, sin, cos, asin, acos, sqrt
from django.contrib.auth.models import User
from . import models
from locations import models as location_models


def get_total_distance(username):
    user = User.objects.get(username=username)
    trips = models.MoveNotification.objects.filter(actor__username=username).order_by('-start_date', '-created_at')
    distance = 0
    for i, trip in enumerate(trips):
        lon1, lat1, lon2, lat2 = map(
            radians, [trips[i].city.longitude, trips[i].city.latitude, trips[i+1].city.longitude, trips[i+1].city.latitude])
        dist = 6371 * (
            acos(sin(lat1) * sin(lat2) + cos(lat1) * cos(lat2) * cos(lon1 - lon2))
        )
        print(dist, trips[i].city.city_name, trips[i+1].city.city_name)
        print(dist)
        distance += dist
        print(distance)

    user.profile.distance = distance
    user.profile.save()
    return distance
