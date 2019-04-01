import graphene
from . import types, queries, mutations


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
    get_duration_users = graphene.Field(
        types.DurationTripsResponse,
        resolver=queries.resolve_get_duration_users,
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
