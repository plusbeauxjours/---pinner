import graphene
from . import types, queries, mutations
from locations import types as location_types
from cards import types as card_types


class Query(object):

    get_notifications = graphene.Field(
        types.GetNotificationsResponse,
        resolver=queries.resolve_get_notifications,
        required=True,
        args={'page': graphene.Int()}
    )
    get_move_notifications = graphene.Field(
        types.GetMoveNotificationsResponse,
        resolver=queries.resolve_get_move_notifications,
        required=True,
        args={'page': graphene.Int()}
    )
    get_trips = graphene.Field(
        location_types.FootprintsResponse,
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
    get_duration_avatars = graphene.Field(
        types.DurationAvatarsResponse,
        resolver=queries.resolve_get_duration_avatars,
        required=True,
        args={
            'page': graphene.Int(),
            'cityName': graphene.String(required=True),
            'startDate': graphene.Date(required=True),
            'endDate': graphene.Date(required=True)
        }
    )
    get_duration_days = graphene.Field(
        types.DurationDaysResponse,
        resolver=queries.resolve_get_duration_days,
        required=True,
        args={
            'page': graphene.Int(),
            'cityName': graphene.String(required=True),
            'startDate': graphene.Date(required=True),
            'endDate': graphene.Date(required=True)
        }
    )
    get_heatmap_data = graphene.Field(
        types.GetHeatmapDataReaponse,
        resolver=queries.resolve_get_heatmap_data,
        required=True,
        args={
            'page': graphene.Int(),
            'cityName': graphene.String(required=True),
        }
    )


class Mutation(object):

    mark_as_read = mutations.MarkAsRead.Field(required=True)
    add_trip = mutations.AddTrip.Field(required=True)
    edit_trip = mutations.EditTrip.Field(required=True)
    delete_trip = mutations.DeleteTrip.Field(required=True)
