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


class AddTrip(graphene.Mutation):

    class Arguments:
        cityName = graphene.String(required=True)
        fromDate = graphene.types.datetime.Date(required=True)
        toDate = graphene.types.datetime.Date(required=True)

    Output = types.AddTripResponse

    @login_required
    def mutate(self, info, **kwargs):

        cityName = kwargs.get('cityName')
        fromDate = kwargs.get('fromDate')
        toDate = kwargs.get('toDate')
        user = info.context.user

        if user.is_authenticated:

            try:
                moveNotification = models.MoveNotification.objects.create(
                    actor=user,
                    city=location_models.City.objects.get(city_name=cityName),
                    from_date=fromDate,
                    to_date=toDate
                )
                return types.AddTripResponse(ok=True, moveNotification=moveNotification)
            except IntegrityError as e:
                print(e)
                raise Exception("Can't create the trip")

        else:
            error = "You need to log in"
            return types.DeleteTripResponse(ok=False)


class EditTrip(graphene.Mutation):

    class Arguments:
        moveNotificationId = graphene.Int(required=True)
        cityName = graphene.String()
        fromDate = graphene.types.datetime.Date()
        toDate = graphene.types.datetime.Date()

    Output = types.EditTripResponse

    @login_required
    def mutate(self, info, **kwargs):

        moveNotificationId = kwargs.get('moveNotificationId')
        user = info.context.user

        if user.is_authenticated:

            try:
                moveNotification = user.movenotification.get(id=moveNotificationId)
            except user.movenotification.DoesNotExist:
                error = "Trip Not Found"
                return types.EditTripResponse(ok=False)

            if moveNotification.actor.id != user.id:

                error = "Unauthorized"
                return types.EditTripResponse(ok=False)

            else:

                try:
                    cityName = kwargs.get('cityName', moveNotification.city.city_name)
                    from_date = kwargs.get('fromDate', moveNotification.from_date)
                    to_date = kwargs.get('toDate', moveNotification.to_date)

                    moveNotification.city = location_models.City.objects.get(city_name=cityName)
                    moveNotification.from_date = from_date
                    moveNotification.to_date = to_date

                    moveNotification.save()
                    return types.EditTripResponse(ok=True, moveNotification=moveNotification)
                except IntegrityError as e:
                    print(e)
                    error = "Can't Save Trip"
                    return types.EditTripResponse(ok=False)

        else:
            error = "You need to log in"
            return types.DeleteTripResponse(ok=False)


class DeleteTrip(graphene.Mutation):

    class Arguments:
        moveNotificationId = graphene.Int(required=True)

    Output = types.DeleteTripResponse

    @login_required
    def mutate(self, info, **kwargs):

        moveNotificationId = kwargs.get('moveNotificationId')
        user = info.context.user

        if user.is_authenticated:

            try:
                moveNotification = user.movenotification.get(id=moveNotificationId)
            except user.movenotification.DoesNotExist:
                error = "Trip Not Found"
                return types.DeleteTripResponse(ok=False)

            if moveNotification.actor.id == user.id:

                moveNotification.delete()
                return types.DeleteTripResponse(ok=True)

            else:

                error = "Unauthorized"
                return types.DeleteTripResponse(ok=False)

        else:
            error = "You need to log in"
            return types.DeleteTripResponse(ok=False)
