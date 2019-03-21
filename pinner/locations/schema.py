import graphene
from . import types, mutations, queries


class Query(object):

    city_profile = graphene.Field(
        types.CityProfileResponse,
        resolver=queries.resolve_city_profile,
        required=True,
        args={
            'cityName': graphene.String(required=True),
            'page': graphene.Int()
        }
    )
    country_profile = graphene.Field(
        types.CountryProfileResponse,
        resolver=queries.resolve_country_profile,
        required=True,
        args={
            'countryName': graphene.String(required=True),
            'page': graphene.Int()
        }
    )
    continent_profile = graphene.Field(
        types.ContinentProfileResponse,
        resolver=queries.resolve_continent_profile,
        required=True,
        args={
            'continentName': graphene.String(required=True),
            'page': graphene.Int()
        }
    )
    get_cities = graphene.Field(
        types.CitiesResponse,
        resolver=queries.resolve_get_cities,
        required=True
    )
    get_countries = graphene.Field(
        types.CountriesResponse,
        resolver=queries.resolve_get_countries,
        required=True
    )
    get_footprints = graphene.Field(
        types.FootprintsResponse,
        resolver=queries.resolve_get_footprints,
        required=True
    )


class Mutation(object):
    report_location = mutations.ReportLocation.Field(required=True)
