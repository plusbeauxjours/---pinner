import graphene
from django.db import IntegrityError
from . import types, models

def resolve_feed(self, info):

    user = info.context.user

    if user.is_authenticated:

        followoing_users = user.user.following.all()

        cards_list = []

        for followoing_user in followoing_users:

            user_cards = following_user.user.images.all()[:2]

            for card in user_cards:

                cards_list.append(card)

        my_cards = user.images.all()[:2]

        for card in my_cards: 

            card_list.append(card)

        cards = sorted(
            card_list, key=lambda card: card.created_at, reverse=True
        )

        ok = True

        error = ''
    
    else: 

        images = []
        ok = False
        error = 'You need to be authenticated'

    return types.FeedResponse(ok=ok, cards=cards, error=error)