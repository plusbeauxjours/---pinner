import graphene
from . import types, queries, mutations


class Query(object):

    get_coffee_by_city = graphene.Field(
        types.GetCoffeeResponse,
        resolver=queries.resolve_get_coffee_by_city,
        required=True,
        args={
            'username': graphene.String(required=True),
        }
    )

    get_coffee_by_gender = graphene.Field(
        types.GetCoffeeResponse,
        resolver=queries.resolve_get_coffee_by_gender,
        required=True,
        args={
            'username': graphene.String(required=True),
        }
    )

    get_coffee_by_nationality = graphene.Field(
        types.GetCoffeeResponse,
        resolver=queries.resolve_get_coffee_by_nationality,
        required=True,
        args={
            'username': graphene.String(required=True),
        }
    )

    get_coffee_to_followers = graphene.Field(
        types.GetCoffeeResponse,
        resolver=queries.resolve_get_coffee_to_followers,
        required=True,
        args={
            'username': graphene.String(required=True),
        }
    )


class Mutation(object):

    request_coffee = mutations.RequestCoffee.Field(required=True)
