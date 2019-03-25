import graphene
from graphql_jwt.decorators import login_required
from . import models, types


class MarkAsRead(graphene.Mutation):

    class Arguments:
        notificationId = graphene.Int(required=True)

    Output = types.MarkAsReadResponse

    @login_required
    def mutate(self, info, **kwargs):

        notificationId = kwargs.get('notificationId')
        user = info.context.user

        try:
            notification = models.Notification.objects.get(
                id=notificationId
            )
            notification.read = True
            notification.save()
            return types.MarkAsReadResponse(ok=True)

        except models.Notification.DoesNotExist:
            raise Exception('Notification Not Found')


class AddTrips(graphene.Mutation):

    class Arguments:
        to_city = graphene.String(required=True)
        from_date = graphene.String(required=True)
        to_date = graphene.String(required=True)

    Output = types.AddTripsResponse

    @login_required
    def mutate(self, info, **kwargs):

        moveNotificationId = kwargs.get('moveNotificationId')
        user = info.context.user

        # if user.is_authenticated:

        # else:
        #     error = 'You need to log in'
        #     return types.ChangePasswordResponse(ok=False)


class EditTrips(graphene.Mutation):

    class Arguments:
        moveNotificationId = graphene.Int(required=True)
        to_city = graphene.String(required=True)
        from_date = graphene.String(required=True)
        to_date = graphene.String(required=True)

    Output = types.EditTripsResponse

    @login_required
    def mutate(self, info, **kwargs):

        moveNotificationId = kwargs.get('moveNotificationId')
        user = info.context.user


class DeleteTrips(graphene.Mutation):

    class Arguments:
        moveNotificationId = graphene.Int(required=True)

    Output = types.DeleteTripsResponse

    @login_required
    def mutate(self, info, **kwargs):

        moveNotificationId = kwargs.get('moveNotificationId')
        user = info.context.user

        if user.is_authenticated:

            try:
                moveNotification = models.MoveNotification.objects.get(id=moveNotificationId)
            except models.MoveNotification.DoesNotExist:
                error = "Card Not Found"
                return types.DeleteTripsResponse(ok=False)

            if moveNotification.actor.id == user.id:

                moveNotification.delete()
                return types.DeleteTripsResponse(ok=True)

            else:

                error = "Unauthorized"
                return types.DeleteTripsResponse(ok=False)

        else:
            error = "You need to log in"
            return types.DeleteTripsResponse(ok=False)
