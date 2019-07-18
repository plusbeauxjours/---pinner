import graphene
from graphene_django.types import DjangoObjectType
from . import models
from django.contrib.auth.models import User
from config import types as config_types
from locations import types as location_types
from coffees import types as coffee_types


class ProfileType(DjangoObjectType):
    username = graphene.String(source='username')
    city_count = graphene.Int(source='city_count')
    country_count = graphene.Int(source='country_count')
    continent_count = graphene.Int(source='continent_count')
    post_count = graphene.Int(source='post_count')
    trip_count = graphene.Int(source='trip_count')
    coffee_count = graphene.Int(source='coffee_count')
    is_self = graphene.Boolean()

    def resolve_is_self(self, info):
        user = info.context.user
        if self.user.id == user.id:
            return True
        else:
            return False

    class Meta:
        model = models.Profile


class AvatarType(DjangoObjectType):
    like_count = graphene.Int(source='like_count')

    class Meta:
        model = models.Avatar


class LikeType(DjangoObjectType):

    class Meta:
        model = models.Like


class ToggleSettingsResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    user = graphene.Field(coffee_types.UserType)


class AvatarListResponse(graphene.ObjectType):
    avatars = graphene.List(AvatarType)


class AvatarDetailResponse(graphene.ObjectType):
    avatar = graphene.Field(AvatarType)


class MarkAsMainResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    uuid = graphene.String()
    avatar = graphene.Field(AvatarType)


class UploadAvatarResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    avatar = graphene.Field(AvatarType)


class UserProfileResponse(graphene.ObjectType):
    user = graphene.Field(coffee_types.UserType)


class EditProfileResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    user = graphene.Field(coffee_types.UserType)


class DeleteProfileResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class DeleteAvatarResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    uuid = graphene.String()


class ChangePasswordResponse(graphene.ObjectType, config_types.ResponseFields):
    pass


class SearchUsersResponse(graphene.ObjectType):
    users = graphene.List(coffee_types.UserType)


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
