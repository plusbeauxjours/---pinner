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
    offset = 5 * page

    following_profiles = user.profile.following.all()

    cards = models.Card.objects.filter(
        creator__profile__in=following_profiles)

    my_cards = user.cards.all()

    combined = cards.union(my_cards).order_by(
        'created_at')[offset:5 + offset]

    return types.FeedResponse(cards=combined)


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