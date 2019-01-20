import graphene
from django.db import IntegrityError
from . import types, models

def resolve_feed(self, info):

    user = info.context.user

    if user.is_authenticated:

        followoing_users = user.user.following.all()

        cards_list = []

        for following_user in followoing_users:

            user_cards = following_user.user.cards.all()[:2]

            for card in user_cards:

                cards_list.append(card)

        my_cards = user.cards.all()[:2]

        for card in my_cards: 

            cards_list.append(card)

        cards = sorted(
            cards_list, key=lambda card: card.created_at, reverse=True
        )

        ok = True

        error = ''
    
    else: 

        cards = []
        ok = False
        error = 'You need to be authenticated'

    return types.FeedResponse(ok=ok, cards=cards, error=error)

def resolve_card_likes(self, info, **kwargs):

    cardId = kwargs.get('cardId')
    user = info.context.user

    ok = True
    error = None

    if user.is_authenticated:
        
        try: 
            card = models.Card.objects.get(id=cardId)
        except models.Card.DoesNotExist:
            error = 'Card Not Found'
            return types.CardLikeResponse(ok=not ok, error=error)

        likes = card.likes.all()
        return types.CardLikeResponse(ok=ok, error=error, likes=likes)

    else:
        error = 'You nees to be authenticated'
        return types.CardLikeResponse(ok=not ok, error=error)
