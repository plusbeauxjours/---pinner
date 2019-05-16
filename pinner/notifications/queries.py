from . import types, models
from django.db.models import Count, F, Q
from django.db.models.fields import DateField
from django.db.models.functions import Trunc

from graphql_jwt.decorators import login_required
from locations import models as location_models
from django.contrib.auth.models import User
from locations import types as location_types

@login_required
def resolve_get_notifications(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 20 * page

    nextPage = page+1

    notifications = user.notification_to.all().order_by(
        '-created_at')

    hasNextPage = offset < notifications.count()

    notifications = notifications[offset:20 + offset]
    print(hasNextPage)

    return types.GetNotificationsResponse(
        notifications=notifications, 
        page=nextPage, 
        hasNextPage=hasNextPage
        )


@login_required
def resolve_search_get_notifications(self, info, **kwargs):

    user = info.context.user
    search = kwargs.get('search',"")
    page = kwargs.get('page', 0)
    offset = 20 * page

    nextPage = page+1
    print(len(search))

    notifications = user.notification_to.all().order_by(
        '-created_at')

    if search:

        notifications = notifications.filter(
            actor__username__istartswith=search)[offset:20 + offset]

        hasNextPage = offset < notifications.count()

        print("search")

        return types.GetNotificationsResponse(
            notifications=notifications, 
            page=nextPage, 
            hasNextPage=hasNextPage
            )
    else: 

        hasNextPage = offset < notifications.count()

        notifications = notifications[offset:20 + offset]

        return types.GetNotificationsResponse(
            notifications=notifications, 
            page=nextPage, 
            hasNextPage=hasNextPage
            )


@login_required
def resolve_get_trips(self, info, **kwargs):

    me = info.context.user
    username = kwargs.get('username')
    user = User.objects.prefetch_related('movenotification').get(username=username)
    tripPage = kwargs.get('tripPage', 0)

    if (tripPage is 0):
        trip = user.movenotification.all().order_by('-start_date')[:20]

    else:
        trip = user.movenotification.all().order_by('-start_date')[:20]

    return location_types.TripResponse(trip=trip)


@login_required
def resolve_get_duration_my_trip(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')
    startDate = kwargs.get('startDate')
    endDate = kwargs.get('endDate')

    try:
        my_trip = user.movenotification.filter(
            city__city_name=cityName, start_date__range=(
            startDate, endDate)) | user.movenotification.filter(
                city__city_name=cityName, 
                end_date__range=(startDate, endDate)
            )

        return types.DurationTripsResponse(moveNotifications=my_trip)

    except models.MoveNotification.DoesNotExist:
        raise Exception("You've never been there at the same time")

