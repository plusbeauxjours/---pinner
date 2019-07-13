from . import types, models
from django.db.models import Count, F, Q
from django.db.models.fields import DateField
from django.db.models.functions import Trunc

from graphql_jwt.decorators import login_required
from locations import models as location_models
from django.contrib.auth.models import User
from locations import types as location_types


@login_required
def resolve_get_trips(self, info, **kwargs):

    username = kwargs.get('username')
    user = User.objects.prefetch_related('movenotification').get(username=username)
    tripPage = kwargs.get('tripPage', 0)

    trip = user.movenotification.all().order_by('-start_date', '-created_at')

    return location_types.TripResponse(trip=trip)
