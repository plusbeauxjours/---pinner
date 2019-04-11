import graphene
from . import types, queries, mutations


class Query(object):

    get_coffee = graphene.Field(
        types.GetCoffeeResponse,
        resolver=queries.resolve_get_coffee,
        required=True,
        args={
            'cityName': graphene.String(required=True),
        }
    )


class Mutation(object):

    request_coffee = mutations.RequestCoffee.Field(required=True)
    get_match = mutations.GetMatch.Field(required=True)
