import graphene
from . import types, mutations, queries
from cards import types as card_types


class Query(object):

    trip_profile = graphene.Field(
        types.TripProfileResponse,
        resolver=queries.resolve_trip_profile,
        required=True,
        args={
            'cityName': graphene.String(required=True),
            'startDate': graphene.Date(required=True),
            'endDate': graphene.Date(required=True)
        }
    )
    city_profile = graphene.Field(
        card_types.FirstAnnotateRespose,
        resolver=queries.resolve_city_profile,
        required=True,
        args={
            'cityName': graphene.String(required=True),
            'page': graphene.Int()
        }
    )
    country_profile = graphene.Field(
        card_types.SecondAnnotateRespose,
        resolver=queries.resolve_country_profile,
        required=True,
        args={
            'countryName': graphene.String(required=True),
            'page': graphene.Int()
        }
    )
    continent_profile = graphene.Field(
        card_types.ThirdAnnotateRespose,
        resolver=queries.resolve_continent_profile,
        required=True,
        args={
            'continentName': graphene.String(required=True),
            'page': graphene.Int()
        }
    )
    get_footprints = graphene.Field(
        types.TripResponse,
        resolver=queries.resolve_get_footprints,
        required=True
    )
    near_cities = graphene.Field(
        types.CitiesResponse,
        resolver=queries.resolve_near_cities,
        required=True,
        args={
            'cityName': graphene.String(required=True),
        }
    )
    near_countries = graphene.Field(
        types.CountriesResponse,
        resolver=queries.resolve_near_countries,
        required=True,
        args={
            'cityName': graphene.String(required=True),
        }
    )
    latest_cities = graphene.Field(
        types.CitiesResponse,
        resolver=queries.resolve_latest_cities,
        required=True,
        args={
            'latestCityPage': graphene.Int()
        }
    )
    search_cities = graphene.Field(
        types.CitiesResponse,
        resolver=queries.resolve_search_cities,
        required=True,
        args={'search': graphene.String(required=True)}
    )
    search_trip_cities = graphene.Field(
        types.CitiesResponse,
        resolver=queries.resolve_search_trip_cities,
        required=True,
        args={'search': graphene.String(required=True)}
    )
    search_countries = graphene.Field(
        types.CountriesResponse,
        resolver=queries.resolve_search_countries,
        required=True,
        args={'search': graphene.String(required=True)}
    )
    search_continents = graphene.Field(
        types.ContinentsResponse,
        resolver=queries.resolve_search_continents,
        required=True,
        args={'search': graphene.String(required=True)}
    )
    get_cities = graphene.Field(
        types.TripResponse,
        resolver=queries.resolve_get_cities,
        required=True,
        args={
            'username': graphene.String(required=True),
        }
    )
    get_countries = graphene.Field(
        types.TripResponse,
        resolver=queries.resolve_get_countries,
        required=True,
        args={
            'username': graphene.String(required=True),
        }
    )
    get_continents = graphene.Field(
        types.TripResponse,
        resolver=queries.resolve_get_continents,
        required=True,
        args={
            'username': graphene.String(required=True),
        }
    )
    


class Mutation(object):
    report_location = mutations.ReportLocation.Field(required=True)
    toggle_like_city = mutations.ToggleLikeCity.Field(required=True)