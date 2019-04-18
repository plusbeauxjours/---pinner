from . import types, models
from django.db.models import Count, F, Q
from django.db.models.fields import DateField
from django.db.models.functions import Trunc

from graphql_jwt.decorators import login_required
from locations import models as location_models
from django.contrib.auth.models import User
from locations import types as location_types
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta


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
def resolve_get_coffee_notifications(self, info, **kwargs):

    user = info.context.user
    profile = user.profile
    followings = profile.followed_by.all()

    coffee_notifications = models.CoffeeNotification.objects.filter(
        verb='coffee', city=profile.current_city)

    everyone_coffee_notifications = coffee_notifications.filter(target='everyone')

    nationality_coffee_notifications = coffee_notifications.filter(
        target='nationality', host__profile__nationality=profile.nationality)

    gender_coffee_notifications = coffee_notifications.filter(
        target='gender', host__profile__gender=profile.gender)

    followers_notifications = models.CoffeeNotification.objects.filter(
        verb='coffee',  target='followers',  host__profile__in=followings)

    combined = everyone_coffee_notifications.union(nationality_coffee_notifications).union(gender_coffee_notifications).union(followers_notifications).order_by(
        '-created_at')

    return types.GetCoffeeNotificationsResponse(ok=True, coffee_notifications=combined)


@login_required
def resolve_get_match_notifications(self, info, **kwargs):

    user = info.context.user

    match_notifications = models.MatchNotification.objects.filter(verb='match', host=user)

    return types.GetMatchNotificationsResponse(ok=True, match_notifications=match_notifications)


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

    if (tripPage is 0):
        footprints = profile.movenotification.order_by('-start_date')[:3]

    else:
        footprints = profile.movenotification.all().order_by('-start_date')[3:30]

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
def resolve_get_heatmap_data(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')
    page = kwargs.get('page', 0)
    startDate = datetime.now() - relativedelta(years=1)
    endDate = datetime.now()

    dateList = {}

    try:
        city = location_models.City.objects.get(city_name=cityName)
        cards = city.cards.filter(created_at__gte=startDate, created_at__lt=endDate).annotate(
            date=Trunc('created_at', 'day', output_field=DateField())).values('date').distinct().order_by(
                '-date').annotate(count=Count('created_at'))
        print(cards)

        # for i in range((endDate - startDate).days + 1):
        #     date = (startDate + timedelta(days=i)).date()
        #     users = city.movenotification.filter(Q(start_date__lte=date) & Q(
        #         end_date__gte=(date))).annotate(
        #         count=Count('id')).values('count')
        #     if users.exists():
        #         print("date: ", date, "users: ", users)

        return types.GetHeatmapDataReaponse(cards=cards, startDate=startDate, endDate=endDate)

    except location_models.City.DoesNotExist:
        raise Exception("Cannot find City")


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
