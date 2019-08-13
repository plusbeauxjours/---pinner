import graphene
from graphql_jwt.decorators import login_required
from graphql_extensions.exceptions import GraphQLError
from django.contrib.auth.models import User
from . import types, models
from django.db.models import Count, F, Sum, Q
from locations import types as location_types
from locations import models as location_models
from notifications import models as notification_models


def resolve_profile(self, info, **kwargs):

    username = kwargs.get('username')

    try:
        profile = User.objects.get(username=username)

    except User.DoesNotExist:
        raise GraphQLError('User not found')

    return types.UserProfileResponse(user=profile)


def resolve_get_avatars(self, info, **kwargs):

    user = info.context.user
    userName = kwargs.get('userName')

    try:
        avatars = models.Avatar.objects.filter(creator__username=userName)
        return types.AvatarListResponse(avatars=avatars)
    except models.Avatar.DoesNotExist:
        return types.AvatarListResponse(avatars=None)


def resolve_get_avatar_detail(self, info, **kwargs):

    user = info.context.user
    avatarId = kwargs.get('avatarId')

    try:
        avatar = models.Avatar.objects.get(uuid=avatarId)
        return types.AvatarDetailResponse(avatar=avatar)
    except models.Avatar.DoesNotExist:
        return types.AvatarDetailResponse(avatar=None)


@login_required
def resolve_top_countries(self, info, **kwargs):

    user = info.context.user
    userName = kwargs.get('userName')

    countries = location_models.Country.objects.filter(
        cities__moveNotificationCity__actor__username=userName).annotate(
        count=Count('cities__moveNotificationCity', distinct=True)).annotate(
        diff=Sum('cities__moveNotificationCity__diff_days')).order_by('-count', '-diff')

    return location_types.CountriesResponse(countries=countries)


@login_required
def resolve_frequent_visits(self, info, **kwargs):

    user = info.context.user
    userName = kwargs.get('userName')

    cities = location_models.City.objects.filter(
        moveNotificationCity__actor__username=userName).annotate(
        count=Count('moveNotificationCity', distinct=True)).annotate(
        diff=Sum('moveNotificationCity__diff_days')).order_by('-count', '-diff')

    return location_types.CitiesResponse(cities=cities)


@login_required
def resolve_top_continents(self, info, **kwargs):

    user = info.context.user
    userName = kwargs.get('userName')

    continents = location_models.Continent.objects.filter(
        countries__cities__moveNotificationCity__actor__username=userName).annotate(
        count=Count('countries__cities__moveNotificationCity', distinct=True)).annotate(
        diff=Sum('countries__cities__moveNotificationCity__diff_days')).order_by('-count', '-diff')

    return location_types.ContinentsResponse(continents=continents)


@login_required
def resolve_me(self, info):

    user = info.context.user

    return types.UserProfileResponse(user=user)


@login_required
def resolve_search_users(self, info, **kwargs):

    user = info.context.user

    search = kwargs.get('search')

    users = User.objects.filter(username__istartswith=search)[:5]

    return types.SearchUsersResponse(users=users)


@login_required
def resolve_recommend_users(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 20 * page

    nextPage = page+1
    userGuest = user.guest.all()
    print(userGuest)
    userHost = user.host.all()
    print(userHost)

    userNationality = user.profile.nationality.nationality.all().exclude(
        id=user.profile.id).exclude(user__host__in=userGuest).exclude(user__host__in=userHost).exclude(user__guest__in=userGuest).exclude(user__guest__in=userHost).order_by('-distance')[:10]
    userResidence = user.profile.residence.residence.all().exclude(
        id=user.profile.id).exclude(user__host__in=userGuest).exclude(user__host__in=userHost).exclude(user__guest__in=userGuest).exclude(user__guest__in=userHost).order_by('-distance')[:10]
    combined = userNationality.union(userResidence)

    userLocation = user.moveNotificationUser.all().order_by('-created_at').order_by('city').distinct('city')[:10]
    for i in userLocation:
        userLocations = models.Profile.objects.filter(
            user__moveNotificationUser__city=i.city).exclude(id=user.profile.id).exclude(user__host__in=userGuest).exclude(user__host__in=userHost).exclude(user__guest__in=userGuest).exclude(user__guest__in=userHost).order_by('-distance')[:10]
        combined = combined.union(userLocations)

    userLike = user.likes.all().order_by(
        '-created_at').order_by('city').distinct('city')[:10]
    for i in userLike:
        userLikes = models.Profile.objects.filter(user__likes__city=i.city).exclude(id=user.profile.id).exclude(user__host__in=userGuest).exclude(
            user__host__in=userHost).exclude(user__guest__in=userGuest).exclude(user__guest__in=userHost).order_by('-distance')[:10]
        combined = combined.union(userLikes)

    combined = combined.order_by('id').distinct('id')
    # .exclude(id=user.profile.id).exclude(id=user.host.id).exclude(id=user.guest.id)

    hasNextPage = offset < combined.count()

    combined = combined[offset:20 + offset]

    return types.RecommendUsersResponse(users=combined, page=nextPage, hasNextPage=hasNextPage)


@login_required
def resolve_user_list(self, info):

    user = info.context.user

    users = models.User.objects.all().exclude(pk=user.pk).order_by(
        '-date_joined')

    return types.UserListResponse(users=users)
