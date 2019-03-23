import graphene
from graphql_jwt.decorators import login_required
from django.contrib.auth.models import User
from . import types, models
from locations import types as location_types


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

    footprints = profile.movenotification.all()

    return location_types.FootprintsResponse(footprints=footprints)


@login_required
def resolve_frequent_visits(self, info, **kwargs):

    user = info.context.user
    username = kwargs.get('username')

    profile = User.objects.get(username=username)

    footprints = profile.movenotification.all()

    return location_types.FootprintsResponse(footprints=footprints)


@login_required
def resolve_me(self, info):

    user = info.context.user

    return types.UserProfileResponse(user=user)


def resolve_search_users(self, info, **kwargs):

    user = info.context.user
    term = kwargs.get('term')

    if len(term) < 2:

        raise Exception("Search Term is Too Short")

    else:

        users = User.objects.filter(username__istartswith=term)

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


def resolve_recommand_users(self, info):

    user = info.context.user

    users = models.User.objects.filter().exclude(pk=user.pk).order_by(
        '-date_joined')[:7]
    return types.RecommandUsersResponse(users=users)


def resolve_user_list(self, info):

    user = info.context.user

    users = models.User.objects.filter().exclude(pk=user.pk).order_by(
        '-date_joined')

    return types.UserListResponse(users=users)
