from . import types, models
from graphql_jwt.decorators import login_required


@login_required
def resolve_get_notifications(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 15 * page

    notifications = models.Notification.objects.filter(target=user).order_by(
        '-created_at')[offset:15 + offset]

    return types.GetNotificationsResponse(ok=True, notifications=notifications)


@login_required
def resolve_get_move_notifications(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 15 * page

    following_profiles = user.profile.following.all()

    move_notifications = models.Notification.objects.filter(
        actor__profile__in=following_profiles, verb='move')

    return types.GetNotificationsResponse(ok=True, move_notifications=move_notifications)
