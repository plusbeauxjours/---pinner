from django.db import IntegrityError
from . import types, models
from .models import Location
from graphql_jwt.decorators import login_required
def resolve_location(self, info):

    user = info.context.user

    ok = True
    error = None

    if user.is_authenticated:
            
        try: 
            locations = Location.objects.all()
        except Location.DoesNotExist:
            error = 'Location Not Found'
            return types.LocationResponse(ok=not ok, error=error)

        return types.LocationResponse(ok=ok, error=error, locations=locations)

    else:
        error = 'You nees to be authenticated'
        return types.LocationResponse(ok=not ok, error=error)
        
@login_required
def resolve_feed(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)

    following_users = user.following.all()

    card_list = []

    for following_user in following_users:

        print(page)

        user_cards = following_user.user.cards.all()[2 * page:2]

        for card in user_cards:

            card_list.append(card)

    my_cards = user.cards.all()[2 * page:2]

    for card in my_cards:

        card_list.append(card)

    cards = sorted(
        card_list, key=lambda card: card.created_at, reverse=True)

    return types.FeedResponse(cards=cards)


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

    try:
        card = models.Card.objects.get(id=cardId)
    except models.Card.DoesNotExist:
        raise Exception('Card not found')

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