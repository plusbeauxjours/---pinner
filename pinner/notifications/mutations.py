import graphene
from django.db import IntegrityError
from . import models, types
from graphql_jwt.decorators import login_required

from locations import models as location_models


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
        cityName = graphene.String()
        fromDate = graphene.String()
        toDate = graphene.String()

    Output = types.EditTripsResponse

    @login_required
    def mutate(self, info, **kwargs):

        moveNotificationId = kwargs.get('moveNotificationId')
        user = info.context.user

        if user.is_authenticated:

            try:
                moveNotification = user.movenotification.get(id=moveNotificationId)
                print(moveNotification.id)
                print(moveNotification)
            except user.movenotification.DoesNotExist:
                error = "Trip Not Found"
                return types.EditTripsResponse(ok=False)

            if moveNotification.actor.id != user.id:

                error = "Unauthorized"
                return types.EditTripsResponse(ok=False)

            else:

                try:
                    cityName = kwargs.get('cityName', moveNotification.to_city.city_name)
                    print(cityName)
                    from_date = kwargs.get('fromDate', moveNotification.from_date)
                    to_date = kwargs.get('toDate', moveNotification.to_date)

                    moveNotification.to_city = location_models.City.objects.get(city_name=cityName)
                    moveNotification.from_date = from_date
                    moveNotification.to_date = to_date

                    moveNotification.save()
                    return types.EditTripsResponse(ok=True, moveNotification=moveNotification)
                except IntegrityError as e:
                    print(e)
                    error = "Can't Save Trip"
                    return types.EditTripsResponse(ok=False)

        else:
            error = "You need to log in"
            return types.DeleteTripsResponse(ok=False)


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
                moveNotification = user.movenotification.get(id=moveNotificationId)
            except user.movenotification.DoesNotExist:
                error = "Trip Not Found"
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
