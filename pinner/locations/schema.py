import graphene
from . import types, mutations, queries


class Query(object):
    getCountries = graphene.Field(
        types.CountriesResponse,
        resolver=queries.resolve_get_countries,
        required=True
    )

    getCities = graphene.Field(
        types.CitiesResponse,
        resolver=queries.resolve_get_cities,
        required=True
    )

    getFootprints = graphene.Field(
        types.FootprintsResponse,
        resolver=queries.resolve_get_footprints,
        required=True
    )


class Mutation(object):
    report_location = mutations.ReportLocation.Field(required=True)
