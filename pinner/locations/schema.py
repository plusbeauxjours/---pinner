import graphene
from . import types, mutations, queries


class Query(object):
    location = graphene.Field(
        types.LocationResponse,
        resolver=queries.resolve_location,
        required=True
    )


class Mutation(object):
    report_location = mutations.ReportLocation.Field(required=True)
