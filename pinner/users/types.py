import graphene
from graphene_django.types import DjangoObjectType
from . import models
from django.contrib.auth.models import User
from config import types as config_types
from notifications import types as notification_types


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


class UserType(DjangoObjectType):

    class Meta:
        model = User
        exclude_fields = ('password',)


class UserProfileResponse(graphene.ObjectType):
    user = graphene.Field(UserType)
    footprints = graphene.List(notification_types.MoveNotificationType)


class FollowUnfollowResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class EditProfileResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    user = graphene.Field(UserType)


class DeleteProfileResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class ChangePasswordResponse(graphene.ObjectType, config_types.ResponseFields):
    pass


class SearchUsersResponse(graphene.ObjectType):
    users = graphene.List(UserType)


class CheckUsernameResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class CreateAccountResponse(graphene.ObjectType):
    token = graphene.String()


class FacebookConnectResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    token = graphene.String()


class RecommandUsersResponse(graphene.ObjectType):
    users = graphene.List(UserType)


class ReportLocationResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class UserListResponse(graphene.ObjectType):
    users = graphene.List(UserType)


class ProfileListResponse(graphene.ObjectType):
    profiles = graphene.List(ProfileType)
