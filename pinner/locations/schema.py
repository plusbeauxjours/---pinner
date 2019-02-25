import graphene
from . import types, mutations, queries


class Query(object):
    getCountry = graphene.Field(
        types.CountryResponse,
        resolver=queries.resolve_get_country,
        required=True
    )

    getCity = graphene.Field(
        types.CityResponse,
        resolver=queries.resolve_get_city,
        required=True
    )


class Mutation(object):
    report_location = mutations.ReportLocation.Field(required=True)
