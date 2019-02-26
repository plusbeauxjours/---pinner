from . import types, models
from graphql_jwt.decorators import login_required


@login_required
def resolve_get_notifications(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 15 * page

    following_profiles = user.profile.following.all()

    my_notifications = models.Notification.objects.filter(target=user).order_by(
        '-created_at')[offset:15 + offset]
    print('mine', my_notifications)

    following_notifications = models.Notification.objects.filter(
        actor__profile__in=following_profiles, verb='move')
    combined = following_notifications.union(my_notifications).order_by(
        '-created_at')[offset:15 + offset]
    return types.GetNotificationsResponse(ok=True, notifications=combined)
