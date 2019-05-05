import graphene
from graphql_jwt.decorators import login_required
from django.contrib.auth.models import User
from . import types, models
from django.db.models import Count, F
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

    # count = profile.movenotification.values('city').annotate(count=Count('city')).order_by(
    #     '-count')
    # print(count)
    # for i in count:
    #     print(i['city'], i['count'])


    # print(footprints)
 


    footprints = profile.movenotification.all().order_by(
        '-city__country').distinct('city__country')[:6]

    return location_types.FootprintsResponse(footprints=footprints)


@login_required
def resolve_frequent_visits(self, info, **kwargs):

    user = info.context.user
    username = kwargs.get('username')
    profile = User.objects.get(username=username)

    footprints = profile.movenotification.all().order_by('-city').distinct('city')[:6]

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

    following_profiles = user.profile.followings.all()

    if (recommandUserPage is 0):
        users = models.User.objects.all().exclude(id=user.id).order_by(
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


@login_required
def resolve_get_knowing_followers(sel, info, **kwargs):

    me = info.context.user
    username = kwargs.get('username')

    try:
        user = User.objects.get(username=username)
        my_followers = me.profile.followers.all()
        user_followers = user.profile.followers.all()
        knowing_followers = my_followers & user_followers
        count = knowing_followers.count()
        return types.KnowingFollowersResponse(profiles=knowing_followers, count=count)

    except User.DoesNotExist:
        raise Exception('User not found')
