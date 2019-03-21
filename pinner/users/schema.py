import graphene
import graphql_jwt
from . import types, mutations, queries


class Query(object):

    user_profile = graphene.Field(
        types.UserProfileResponse,
        resolver=queries.resolve_profile,
        required=True,
        args={'username': graphene.String(required=True)}
    )
    me = graphene.Field(
        types.UserProfileResponse,
        resolver=queries.resolve_me,
        required=True
    )
    search_users = graphene.Field(
        types.SearchUsersResponse,
        resolver=queries.resolve_search_users,
        required=True,
        args={'term': graphene.String(required=True)}
    )
    check_username = graphene.Field(
        types.CheckUsernameResponse,
        resolver=queries.resolve_check_username,
        required=True,
        args={'username': graphene.String(required=True)}
    )
    latest_users = graphene.Field(
        types.LatestUsersResponse,
        resolver=queries.resolve_latest_users,
        required=True
    )
    user_list = graphene.Field(
        types.UserListResponse,
        resolver=queries.resolve_user_list,
        required=True
    )


class Mutation(object):

    follow_user = mutations.FollowUser.Field(required=True)
    edit_profile = mutations.EditProfile.Field(required=True)
    delete_profile = mutations.DeleteProfile.Field(required=True)
    change_password = mutations.ChangePassword.Field(required=True)
    log_in = graphql_jwt.ObtainJSONWebToken.Field(required=True)
    create_account = mutations.CreateAccount.Field(required=True)
    facebook_connect = mutations.FacebookConnect.Field(required=True)
