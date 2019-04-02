import graphene
from graphql_jwt.decorators import login_required
from django.contrib.auth.models import User
from . import types, models
from locations import types as location_types
from locations import models as location_models


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
    profile = User.objects.get(username=username)
    topCountryPage = kwargs.get('topCountryPage', 0)

    if (topCountryPage is 0):
        footprints = profile.movenotification.all().order_by(
            '-city__country').distinct('city__country')[:6]
    else:
        footprints = profile.movenotification.all().order_by(
            '-city__country').distinct('city__country')[6:12]

    return location_types.FootprintsResponse(footprints=footprints)


@login_required
def resolve_frequent_visits(self, info, **kwargs):

    user = info.context.user
    username = kwargs.get('username')
    profile = User.objects.get(username=username)
    frequentVisitPage = kwargs.get('frequentVisitPage', 0)

    if (frequentVisitPage is 0):
        footprints = profile.movenotification.all().order_by('-city').distinct('city')[:6]
    else:
        footprints = profile.movenotification.all().order_by('-city').distinct('city')[6:12]

    return location_types.FootprintsResponse(footprints=footprints)


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

    if (recommandUserPage is 0):
        users = models.User.objects.filter().exclude(pk=user.pk).order_by(
            '-date_joined')[:9]
    else:
        users = models.User.objects.filter().exclude(pk=user.pk).order_by(
            '-date_joined')[9:18]

    return types.RecommandUsersResponse(users=users)


@login_required
def resolve_user_list(self, info):

    user = info.context.user

    users = models.User.objects.filter().exclude(pk=user.pk).order_by(
        '-date_joined')

    return types.UserListResponse(users=users)


@login_required
def resolve_get_followers(self, info, **kwargs):

    username = kwargs.get('username')

    try:
        user = User.objects.get(username=username)
        followers_profile = user.profile.followers.all()

    except User.DoesNotExist:
        raise Exception('User not found')

    return types.ProfileListResponse(profiles=followers_profile)


@login_required
def resolve_get_followings(self, info, **kwargs):

    username = kwargs.get('username')

    try:
        user = User.objects.get(username=username)
        following_profile = user.profile.followings.all()

    except User.DoesNotExist:
        raise Exception('User not found')

    return types.ProfileListResponse(profiles=following_profile)
