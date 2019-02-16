from . import types, models
from graphql_jwt.decorators import login_required

@login_required
def resolve_get_notifications(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)

    try:
        notifications = models.Notification.objects.filter(target=user)[
            25 * page:15]
        return types.GetNotificationsResponse(ok=True, notifications=notifications)

    except models.Notification.DoesNotExist:
        raise Exception("Notification Not Found")