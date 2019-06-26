import graphene
from graphql_jwt.decorators import login_required
from django.contrib.auth.models import User
from . import types, models
from django.db.models import Count, F, Sum
from locations import types as location_types
from locations import models as location_models
from notifications import models as notification_models


def resolve_profile(self, info, **kwargs):

    username = kwargs.get('username')
    print('username', username)

    try:
        profile = User.objects.get(username=username)
        try:
            mainAvatar = models.Avatar.objects.get(is_main=True)
        except:
            mainAvatar = models.Avatar.objects.latest('created_at')

    except User.DoesNotExist:
        raise Exception('User not found')

    return types.UserProfileResponse(user=profile, mainAvatar=mainAvatar)


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
        cities__movenotification__actor__username=userName).annotate(
        count=Count('cities__movenotification', distinct=True)).annotate(
        diff=Sum('cities__movenotification__diff_days')).order_by('-count', '-diff')

    return location_types.CountriesResponse(countries=countries)


@login_required
def resolve_frequent_visits(self, info, **kwargs):

    user = info.context.user
    userName = kwargs.get('userName')

    cities = location_models.City.objects.filter(
        movenotification__actor__username=userName).annotate(
        count=Count('movenotification', distinct=True)).annotate(
        diff=Sum('movenotification__diff_days')).order_by('-count', '-diff')

    return location_types.CitiesResponse(cities=cities)


@login_required
def resolve_me(self, info):

    user = info.context.user

    return types.UserProfileResponse(user=user)


@login_required
def resolve_search_users(self, info, **kwargs):

    user = info.context.user

    search = kwargs.get('search')

    users = User.objects.filter(username__istartswith=search)

    return types.SearchUsersResponse(users=users)


@login_required
def resolve_recommand_users(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 12 * page

    nextPage = page+1

    users = models.User.objects.all().exclude(id=user.id).order_by('-profile__created_at')

    hasNextPage = offset < users.count()

    users = users[offset:12 + offset]

    return types.RecommandUsersResponse(users=users, page=nextPage, hasNextPage=hasNextPage)


@login_required
def resolve_user_list(self, info):

    user = info.context.user

    users = models.User.objects.all().exclude(pk=user.pk).order_by(
        '-date_joined')

    return types.UserListResponse(users=users)
