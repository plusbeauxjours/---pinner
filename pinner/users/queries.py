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

    try:
        profile = User.objects.get(username=username)

    except User.DoesNotExist:
        raise Exception('User not found')

    return types.UserProfileResponse(user=profile)


@login_required
def resolve_top_countries(self, info, **kwargs):

    user = info.context.user
    username = kwargs.get('username')

    countries = location_models.Country.objects.filter(
        cities__movenotification__actor__username=username).annotate(
        count=Count('cities__movenotification', distinct=True)).annotate(
        diff=Sum('cities__movenotification__diff_days')).order_by('-count')[:6]
    
    return location_types.CountriesResponse(countries=countries)


@login_required
def resolve_frequent_visits(self, info, **kwargs):

    user = info.context.user
    username = kwargs.get('username')

    cities = location_models.City.objects.filter(
        movenotification__actor__username=username).annotate(
        count=Count('movenotification', distinct=True)).annotate(
        diff=Sum('movenotification__diff_days')).order_by('-count')[:6]

    return location_types.CitiesResponse(cities=cities)


@login_required
def resolve_me(self, info):

    user = info.context.user

    return types.UserProfileResponse(user=user)


@login_required
def resolve_search_users(self, info, **kwargs):

    user = info.context.user
    term = kwargs.get('term')

    if len(term) < 2:

        raise Exception("Search Term is Too Short")

    else:

        users = User.objects.filter(username__icontains=term)

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
    recommandUserPage = kwargs.get('recommandUserPage', 0)

    following_profiles = user.profile.followings.values('id')

    if (recommandUserPage is 0):
        users = models.User.objects.all().exclude(id=user.id).exclude(id__in=following_profiles).order_by(
            '-id')[:9]
    else:
        users = models.User.objects.all().exclude(id=user.id).order_by(
            '-id')[9:18]

    return types.RecommandUsersResponse(users=users)


@login_required
def resolve_user_list(self, info):

    user = info.context.user

    users = models.User.objects.all().exclude(pk=user.pk).order_by(
        '-date_joined')

    return types.UserListResponse(users=users)


@login_required
def resolve_get_followers(self, info, **kwargs):

    username = kwargs.get('username')

    try:
        user = User.objects.select_related('profile').get(username=username)
        followers_profile = user.profile.followers.all()

    except User.DoesNotExist:
        raise Exception('User not found')

    return types.ProfileListResponse(profiles=followers_profile)


@login_required
def resolve_get_followings(self, info, **kwargs):

    username = kwargs.get('username')

    try:
        user = User.objects.select_related('profile').get(username=username)
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
        my_followers = me.profile.followers.all()
        user_followers = user.profile.followers.all()
        knowing_followers = my_followers & user_followers
        count = knowing_followers.count()
        return types.KnowingFollowersResponse(profiles=knowing_followers, count=count)

    except User.DoesNotExist:
        raise Exception('User not found')
