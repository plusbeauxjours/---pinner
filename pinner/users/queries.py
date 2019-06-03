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

    except User.DoesNotExist:
        raise Exception('User not found')

    return types.UserProfileResponse(user=profile)


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

    users = User.objects.filter(username__icontains=search)

    return types.SearchUsersResponse(users=users)


@login_required
def resolve_check_username(self, info, **kwargs):

    user = info.context.user
    username = kwargs.get('username')

    try:
        existing_username = User.objects.get(username=username)
        raise Exception("Username is taken")
    except User.DoesNotExist:
        return types.CheckUsernameResponse(ok=True)


@login_required
def resolve_recommand_users(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 12 * page

    nextPage = page+1

    following_profiles = user.profile.followings.values('id')

    users = models.User.objects.all().exclude(id=user.id).exclude(
        profile__id__in=following_profiles).order_by('-profile__created_at')

    hasNextPage = offset < users.count()

    users = users[offset:12 + offset]

    return types.RecommandUsersResponse(users=users, page=nextPage, hasNextPage=hasNextPage)


@login_required
def resolve_user_list(self, info):

    user = info.context.user

    users = models.User.objects.all().exclude(pk=user.pk).order_by(
        '-date_joined')

    return types.UserListResponse(users=users)


@login_required
def resolve_get_followers(self, info, **kwargs):

    userName = kwargs.get('userName')

    try:
        user = User.objects.select_related('profile').get(username=userName)
        followers_profile = user.profile.followers.all()

    except User.DoesNotExist:
        raise Exception('User not found')

    return types.ProfileListResponse(profiles=followers_profile)


@login_required
def resolve_get_followings(self, info, **kwargs):

    userName = kwargs.get('userName')

    try:
        user = User.objects.select_related('profile').get(username=userName)
        following_profile = user.profile.followings.all()

    except User.DoesNotExist:
        raise Exception('User not found')

    return types.ProfileListResponse(profiles=following_profile)


@login_required
def resolve_get_knowing_followers(sel, info, **kwargs):

    me = info.context.user
    username = kwargs.get('username')

    try:
        user = User.objects.select_related('profile').get(username=username)
        my_followings = me.profile.followings.all()
        user_followers = user.profile.followers.all()
        knowing_followers = my_followings.intersection(user_followers)
        count = knowing_followers.count()
        return types.KnowingFollowersResponse(profiles=knowing_followers, count=count)

    except User.DoesNotExist:
        raise Exception('User not found')
