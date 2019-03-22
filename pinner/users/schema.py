import graphene
import graphql_jwt
from . import types, mutations, queries
from locations import types as location_types


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
    recommand_users = graphene.Field(
        types.RecommandUsersResponse,
        resolver=queries.resolve_recommand_users,
        required=True
    )
    user_list = graphene.Field(
        types.UserListResponse,
        resolver=queries.resolve_user_list,
        required=True
    )
    top_countries = graphene.Field(
        location_types.FootprintsResponse,
        resolver=queries.resolve_top_countries,
        required=True,
        args={'username': graphene.String(required=True)}
    )
    frequent_visits = graphene.Field(
        location_types.FootprintsResponse,
        resolver=queries.resolve_frequent_visits,
        required=True,
        args={'username': graphene.String(required=True)}
    )


class Mutation(object):

    follow_user = mutations.FollowUser.Field(required=True)
    edit_profile = mutations.EditProfile.Field(required=True)
    delete_profile = mutations.DeleteProfile.Field(required=True)
    change_password = mutations.ChangePassword.Field(required=True)
    log_in = graphql_jwt.ObtainJSONWebToken.Field(required=True)
    create_account = mutations.CreateAccount.Field(required=True)
    facebook_connect = mutations.FacebookConnect.Field(required=True)
