import graphene
from . import models, types

class MarkAsRead(graphene.Mutation):

    class Arguments:
        notificationId = graphene.Int(required=True)

    Output = types.MarkAsReadResponse

    def mutate(self, info, **kwargs):

        notificationId = kwargs.get('notificationId')
        user = info.contex.user
        ok = True
        error = None

        if user.is_authenticated:

            try:
                notification = models.Notification.objects.get(
                    id=notificationId
                )
                notification.read=True
                notification.save()
            except models.Notification.DoesNotExist:
                error = "Notification Not Found"
                return types.MarkAsReadResponse(ok=not ok, error=error)
                
        else:
            error = "Unauthorized"
            return types.MarkAsResadResponse(ok=not ok, error=error)