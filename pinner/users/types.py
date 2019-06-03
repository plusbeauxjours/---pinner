import graphene
from graphene_django.types import DjangoObjectType
from . import models
from django.contrib.auth.models import User
from config import types as config_types
from locations import types as location_types
from coffees import types as coffee_types


class ProfileType(DjangoObjectType):
    username = graphene.String(source='username')
    following_count = graphene.Int(source='followers_count')
    followers_count = graphene.Int(source='following_count')
    city_count = graphene.Int(source='city_count')
    country_count = graphene.Int(source='country_count')
    continent_count = graphene.Int(source='continent_count')
    post_count = graphene.Int(source='post_count')
    trip_count = graphene.Int(source='trip_count')
    is_following = graphene.Boolean()
    is_self = graphene.Boolean()

    def resolve_is_following(self, info):
        user = info.context.user
        if self in user.profile.followings.all():
            return True
        else:
            return False

    def resolve_is_self(self, info):
        user = info.context.user
        if self.user.id == user.id:
            return True
        else:
            return False

    class Meta:
        model = models.Profile


class UserProfileResponse(graphene.ObjectType):
    user = graphene.Field(coffee_types.UserType)


class ProfileListResponse(graphene.ObjectType):
    profiles = graphene.List(ProfileType)


class FollowUnfollowResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    user = graphene.Field(coffee_types.UserType)
    follow = graphene.Boolean()


class EditProfileResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    user = graphene.Field(coffee_types.UserType)


class DeleteProfileResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class ChangePasswordResponse(graphene.ObjectType, config_types.ResponseFields):
    pass


class SearchUsersResponse(graphene.ObjectType):
    users = graphene.List(coffee_types.UserType)


class CheckUsernameResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class CreateAccountResponse(graphene.ObjectType):
    token = graphene.String()


class FacebookConnectResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    token = graphene.String()


class RecommandUsersResponse(graphene.ObjectType):
    page = graphene.Int()
    hasNextPage = graphene.Boolean()
    users = graphene.List(coffee_types.UserType)


class ReportLocationResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class UserListResponse(graphene.ObjectType):
    users = graphene.List(coffee_types.UserType)


class KnowingFollowersResponse(graphene.ObjectType):
    profiles = graphene.List(ProfileType)
    count = graphene.Int()
