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
