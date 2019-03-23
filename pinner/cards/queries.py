from django.db import IntegrityError
from . import types, models
from graphql_jwt.decorators import login_required

from django.contrib.auth.models import User
from locations import models as location_models
from notifications import models as notification_models


@login_required
def resolve_feed(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    cityName = kwargs.get('cityName')
    offset = 5 * page

    following_profiles = user.profile.followings.all()

    following_cards = models.Card.objects.filter(
        creator__profile__in=following_profiles)

    city_cards = models.Card.objects.filter(
        city__city_name=cityName)

    my_cards = user.cards.all()

    usersNow = User.objects.filter(
        profile__current_city__city_name=cityName).order_by('-username').distinct('username')

    usersBefore = notification_models.MoveNotification.objects.filter(
        to_city__city_name=cityName).order_by('-actor_id').distinct('actor_id')

    combined = following_cards.union(city_cards).union(my_cards).order_by(
        '-created_at')[offset:5 + offset]

    city = location_models.City.objects.get(city_name=cityName)

    return types.FeedResponse(cards=combined, usersNow=usersNow, usersBefore=usersBefore, city=city)


@login_required
def resolve_card_likes(self, info, **kwargs):

    cardId = kwargs.get('cardId')
    user = info.context.user

    try:
        card = models.Card.objects.get(id=cardId)
    except models.Card.DoesNotExist:
        raise Exception('Card not found')

    likes = card.likes.all()
    return types.CardLikeResponse(likes=likes)


@login_required
def resolve_card_detail(self, info, **kwargs):

    cardId = kwargs.get('cardId')
    user = info.context.user

    if cardId:
        try:
            card = models.Card.objects.get(id=cardId)
        except:
            pass

    return types.CardDetailResponse(card=card)


@login_required
def resolve_search_cards(self, info, **kwargs):

    user = info.context.user
    term = kwargs.get('term')

    if len(term) < 2:

        raise Exception('Search Term is too short')

    else:

        cards = models.Card.objects.filter(caption__icontains=term)

        return types.SearchCardsResponse(cards=cards)


@login_required
def resolve_latest_cards(self, info):

    user = info.context.user

    cards = models.Card.objects.filter().order_by('-created_at')[:10]
    return types.LatestCardsResponse(cards=cards)
