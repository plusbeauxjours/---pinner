import graphene
from . import types, queries, mutations
from locations import types as location_types


class Query(object):

    get_notifications = graphene.Field(
        types.GetNotificationsResponse,
        resolver=queries.resolve_get_notifications,
        required=True,
        args={'page': graphene.Int()}
    )
    search_get_notifications = graphene.Field(
        types.GetNotificationsResponse,
        resolver=queries.resolve_search_get_notifications,
        required=True,
        args={
            'page': graphene.Int(),
            'search': graphene.String()
        }
    )
    get_trips = graphene.Field(
        location_types.TripResponse,
        resolver=queries.resolve_get_trips,
        required=True,
        args={
            'username': graphene.String(required=True),
            'tripPage': graphene.Int(),
        }
    )
    get_duration_my_trip = graphene.Field(
        types.DurationTripsResponse,
        resolver=queries.resolve_get_duration_my_trip,
        required=True,
        args={
            'page': graphene.Int(),
            'cityName': graphene.String(required=True),
            'startDate': graphene.Date(required=True),
            'endDate': graphene.Date(required=True)
        }
    )


class Mutation(object):

    mark_as_read = mutations.MarkAsRead.Field(required=True)
    add_trip = mutations.AddTrip.Field(required=True)
    edit_trip = mutations.EditTrip.Field(required=True)
    delete_trip = mutations.DeleteTrip.Field(required=True)
