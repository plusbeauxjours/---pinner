from . import types, models
from graphql_jwt.decorators import login_required


@login_required
def resolve_get_notifications(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 10 * page

    following_profiles = user.profile.followings.all()

    upload_notifications = models.Notification.objects.filter(
        actor__profile__in=following_profiles, verb='upload')
    notifications = models.Notification.objects.filter(target=user)

    combined = notifications.union(upload_notifications).order_by(
        '-created_at')[offset:10 + offset]

    return types.GetNotificationsResponse(ok=True, notifications=combined)


@login_required
def resolve_get_move_notifications(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 7 * page

    following_profiles = user.profile.followings.all()

    notifications = models.MoveNotification.objects.filter(
        actor__profile__in=following_profiles, verb='move').order_by(
        '-end_date')[offset:3 + offset]

    return types.GetMoveNotificationsResponse(ok=True, notifications=notifications)
