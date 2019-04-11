import graphene
from . import types, queries, mutations


class Query(object):

    get_coffees = graphene.Field(
        types.GetCoffeesResponse,
        resolver=queries.resolve_get_coffees,
        required=True,
        args={
            'cityName': graphene.String(required=True),
            'coffeePage': graphene.Int()
        }
    )


class Mutation(object):

    request_coffee = mutations.RequestCoffee.Field(required=True)
    get_match = mutations.GetMatch.Field(required=True)
