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
            return types.MarkAsReadResponse(ok=True,notificationId=notificationId)

        except models.Notification.DoesNotExist:
            raise Exception('Notification Not Found')


class AddTrip(graphene.Mutation):

    class Arguments:
        cityName = graphene.String(required=True)
        startDate = graphene.types.datetime.DateTime(required=True)
        endDate = graphene.types.datetime.DateTime(required=True)

    Output = types.AddTripResponse

    @login_required
    def mutate(self, info, **kwargs):

        cityName = kwargs.get('cityName')
        startDate = kwargs.get('startDate')
        endDate = kwargs.get('endDate')
        user = info.context.user

        try:
            moveNotification = models.MoveNotification.objects.create(
                actor=user,
                city=location_models.City.objects.get(city_name=cityName),
                start_date=startDate,
                end_date=endDate
            )
            return types.AddTripResponse(ok=True, moveNotification=moveNotification)
        except IntegrityError as e:
            print(e)
            raise Exception("Can't create the trip")


class EditTrip(graphene.Mutation):

    class Arguments:
        moveNotificationId = graphene.Int(required=True)
        cityName = graphene.String()
        startDate = graphene.types.datetime.DateTime()
        endDate = graphene.types.datetime.DateTime()

    Output = types.EditTripResponse

    @login_required
    def mutate(self, info, **kwargs):

        moveNotificationId = kwargs.get('moveNotificationId')
        user = info.context.user

        try:
            moveNotification = user.movenotification.get(id=moveNotificationId)
        except user.movenotification.DoesNotExist:
            raise Exception('Trip Not Found')

        if moveNotification.actor.id != user.id:
            raise Exception('Unauthorized')

        else:

            try:
                cityName = kwargs.get('cityName', moveNotification.city.city_name)
                startDate = kwargs.get('startDate', moveNotification.start_date)
                endDate = kwargs.get('endDate', moveNotification.end_date)

                moveNotification.city = location_models.City.objects.get(city_name=cityName)
                moveNotification.start_date = startDate
                moveNotification.end_date = endDate

                moveNotification.save()
                return types.EditTripResponse(ok=True, moveNotification=moveNotification)
            except IntegrityError as e:
                print(e)
                raise Exception("Can't Save Trip")


class DeleteTrip(graphene.Mutation):

    class Arguments:
        moveNotificationId = graphene.Int(required=True)

    Output = types.DeleteTripResponse

    @login_required
    def mutate(self, info, **kwargs):

        moveNotificationId = kwargs.get('moveNotificationId')
        user = info.context.user

        try:
            moveNotification = user.movenotification.get(id=moveNotificationId)
        except user.movenotification.DoesNotExist:
            raise Exception('Trip Not Found')

        if moveNotification.actor.id == user.id:

            moveNotification.delete()
            return types.DeleteTripResponse(ok=True, tripId=moveNotificationId)

        else:
            raise Exception('You need to log in')
