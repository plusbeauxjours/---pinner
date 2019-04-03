from . import types, models
from graphql_jwt.decorators import login_required
from locations import models as location_models
from django.contrib.auth.models import User
from locations import types as location_types


@login_required
def resolve_get_notifications(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 10 * page

    following_profiles = user.profile.followings.all()

    upload_notifications = models.Notification.objects.filter(
        actor__profile__in=following_profiles, verb='upload')
    notifications = models.Notification.objects.filter(target=user)

    combined = notifications.union(upload_notifications).order_by(
        '-created_at')[offset:10 + offset]

    return types.GetNotificationsResponse(ok=True, notifications=combined)


@login_required
def resolve_get_move_notifications(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 7 * page

    following_profiles = user.profile.followings.all()

    notifications = models.MoveNotification.objects.filter(
        actor__profile__in=following_profiles, verb='move').order_by(
        '-start_date')[offset:3 + offset]

    return types.GetMoveNotificationsResponse(ok=True, notifications=notifications)


@login_required
def resolve_get_trips(self, info, **kwargs):

    user = info.context.user
    username = kwargs.get('username')
    profile = User.objects.get(username=username)
    tripPage = kwargs.get('tripPage', 0)
    offset = 30 * (tripPage - 1)

    if (tripPage is 0):
        footprints = profile.movenotification.order_by('-start_date')[:3]

    else:
        footprints = profile.movenotification.all().order_by('-start_date')[offset+3: 30+offset+3]

    return location_types.FootprintsResponse(footprints=footprints)


@login_required
def resolve_get_duration_my_trip(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')
    startDate = kwargs.get('startDate')
    endDate = kwargs.get('endDate')

    try:
        my_trip = user.movenotification.filter(city__city_name=cityName, start_date__range=(
            startDate, endDate)) | user.movenotification.filter(city__city_name=cityName, end_date__range=(startDate, endDate))

        return types.DurationTripsResponse(moveNotifications=my_trip)

    except models.MoveNotification.DoesNotExist:
        raise Exception("You've never been there at the same time")


@login_required
def resolve_get_duration_avatars(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')
    startDate = kwargs.get('startDate')
    endDate = kwargs.get('endDate')
    page = kwargs.get('page', 0)

    try:
        city = location_models.City.objects.get(city_name=cityName)
        usersBefore = city.movenotification.filter(
            city__city_name=cityName, end_date__range=(startDate, endDate))
        usersBefore = usersBefore.order_by('actor_id', '-end_date').distinct('actor_id')
        return types.DurationAvatarsResponse(usersBefore=usersBefore)

    except models.MoveNotification.DoesNotExist:
        raise Exception("You've never been there at the same time")


@login_required
def resolve_get_cross_paths_avatars(self, info, **kwargs):

    user = info.context.user
    username = kwargs.get('username')
    page = kwargs.get('page', 0)

    try:
        profile = User.profile.objects.get(username=username)
        users = profile.movenotification.filter(end_date__range=(startDate, endDate))
        users = users.order_by('actor_id', '-end_date').distinct('actor_id')
        return types.DurationAvatarsResponse(users=users)

    except models.MoveNotification.DoesNotExist:
        raise Exception("You've never been there at the same time")


@login_required
def resolve_get_duration_days(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')
    startDate = kwargs.get('startDate')
    endDate = kwargs.get('endDate')
    page = kwargs.get('page', 0)

    try:
        my_trips = user.movenotification.filter(city__city_name=cityName, end_date__range=(startDate, endDate))

        # city = location_models.City.objects.get(city_name=cityName)
        # trips = city.movenotification.filter(start_date__range=(
        #     startDate, endDate)) | city.movenotification.filter(end_date__range=(startDate, endDate))
        # usersBefore = usersBefore.order_by('actor_id', '-end_date').distinct('actor_id')
        return types.DurationDaysResponse(myTrips=my_trips)

    except models.MoveNotification.DoesNotExist:
        raise Exception("You've never been there at the same time")


# @login_required
# def resolve_get_previous_cities(self, info, **kwargs):

#     user = info.context.user
#     cityName = kwargs.get('cityName')
#     startDate = kwargs.get('startDate')
#     endDate = kwargs.get('endDate')

#     try:
#         my_footprints = user.movenotification.filter(city__city_name=cityName, start_date__range=(
#             startDate, endDate)) | user.movenotification.filter(city__city_name=cityName, end_date__range=(startDate, endDate))

#         return types.TripProfileResponse(moveNotifications=my_footprints, cards=cards, users=users)

#     except models.MoveNotification.DoesNotExist:
#         raise Exception("You've never been there at the same time")


# @login_required
# def resolve_get_next_cities(self, info, **kwargs):

#     user = info.context.user
#     cityName = kwargs.get('cityName')
#     startDate = kwargs.get('startDate')
#     endDate = kwargs.get('endDate')

#     try:
#         my_footprints = user.movenotification.filter(city__city_name=cityName, start_date__range=(
#             startDate, endDate)) | user.movenotification.filter(city__city_name=cityName, end_date__range=(startDate, endDate))

#         return types.TripProfileResponse(moveNotifications=my_footprints, cards=cards, users=users)

#     except models.MoveNotification.DoesNotExist:
#         raise Exception("You've never been there at the same time")
