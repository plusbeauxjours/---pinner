import graphene
from . import types, mutations, queries


class Query(object):
    get_countries = graphene.Field(
        types.CountriesResponse,
        resolver=queries.resolve_get_countries,
        required=True
    )

    get_cities = graphene.Field(
        types.CitiesResponse,
        resolver=queries.resolve_get_cities,
        required=True
    )

    get_footprints = graphene.Field(
        types.FootprintsResponse,
        resolver=queries.resolve_get_footprints,
        required=True
    )
    get_users_by_city = graphene.Field(
        types.GetUsersByCityResponse,
        resolver=queries.resolve_get_users_by_city,
        required=True,
        args={'cityname': graphene.String(required=True)}
    )


class Mutation(object):
    report_location = mutations.ReportLocation.Field(required=True)
