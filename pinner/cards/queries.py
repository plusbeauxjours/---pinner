from django.db import IntegrityError
from . import types, models
from graphql_jwt.decorators import login_required
from django.contrib.auth.models import User


@login_required
def resolve_feed(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    cityname = kwargs.get('cityname')
    offset = 5 * page

    following_profiles = user.profile.following.all()

    following_cards = models.Card.objects.filter(
        creator__profile__in=following_profiles)

    city_cards = models.Card.objects.filter(
        city__cityname=cityname)

    my_cards = user.cards.all()

    combined = following_cards.union(city_cards).union(my_cards).order_by(
        '-created_at')[offset:5 + offset]

    return types.FeedResponse(cards=combined)


@login_required
def resolve_feed_by_city(self, info, **kwargs):

    user = info.context.user
    cityname = kwargs.get('cityname')
    page = kwargs.get('page', 0)
    offset = 5 * page

    cards = models.Card.objects.filter(city__cityname=cityname).order_by(
        '-created_at')[offset:5 + offset]

    users = User.objects.filter(
        profile__current_city__cityname=cityname).order_by('-username').distinct('username')[:3]
    return types.FeedByCityResponse(cards=cards, users=users)


@login_required
def resolve_card_likes(self, info, **kwargs):

    cardId = kwargs.get('cardId')
    user = info.context.user

    try:
        card = models.Card.objects.get(id=cardId)
    except models.Card.DoesNotExist:
        raise Exception('Card not found')

    likes = card.likes.all()
    return types.PhotoLikeResponse(likes=likes)


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

    if len(term) < 4:

        raise Exception('Search Term is too short')

    else:

        cards = models.Card.objects.filter(caption__icontains=term)

        return types.SearchCardsResponse(cards=cards)


@login_required
def resolve_latest_cards(self, info):

    user = info.context.user

    cards = models.Card.objects.filter().order_by('-created_at')[:10]
    return types.LatestCardsResponse(cards=cards)
