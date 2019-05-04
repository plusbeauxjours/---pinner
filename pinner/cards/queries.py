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

    nextPage = page+1
    
    city = location_models.City.objects.get(city_name=cityName)

    following_profiles = user.profile.followings.all()

    following_cards = models.Card.objects.filter(
        creator__profile__in=following_profiles)

    city_cards = models.Card.objects.filter(
        city__city_name=cityName)

    my_cards = user.cards.all()

    usersNow = User.objects.filter(
        profile__current_city__city_name=cityName).order_by('-username').distinct('username')

    if usersNow.count() < 5:
        usersBefore = notification_models.MoveNotification.objects.filter(
            city__city_name=cityName).order_by('-actor_id').distinct('actor_id')
    else:
        usersBefore = notification_models.MoveNotification.objects.filter(
            id=0)

    combined = following_cards.union(city_cards).union(my_cards).order_by(
        '-created_at')
    hasNextPage = offset < combined.count()
    combined = combined[offset:5 + offset]

    return types.FeedResponse(cards=combined, usersNow=usersNow, usersBefore=usersBefore, city=city,  page=nextPage, hasNextPage=hasNextPage)


@login_required
def resolve_get_cards(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 12 * page

    location = kwargs.get('location')
    cityName = kwargs.get('cityName')
    countryName = kwargs.get('countryName')
    continentName = kwargs.get('continentName')

    nextPage = page+1

    if location == "city":
        try:
            city = location_models.City.objects.get(city_name=cityName)
            cards = city.cards.all().order_by('-created_at')[offset:12 + offset]
            hasNextPage = offset < city.card_count
            print(city.card_count)
            return types.GetCardsResponse(cards=cards, page=nextPage, hasNextPage=hasNextPage)
        except models.Card.DoesNotExist:
            raise Exception('Card not found')

    elif location == "country":
        try:
            country = location_models.Country.objects.get(country_name=countryName)
            cards = country.cards.all().order_by('-created_at')[offset:12 + offset]
            hasNextPage = offset < country.card_count
            print(country.card_count)
            return types.GetCardsResponse(cards=cards, page=nextPage, hasNextPage=hasNextPage)
        except models.Card.DoesNotExist:
            raise Exception('Card not found')

    elif location == "continent":
        try:
            cards = models.Card.objects.filter(
                city__country__continent__continent_name=continentName).order_by('-created_at')[offset:12 + offset]
            return types.GetCardsResponse(cards=cards, page=nextPage, hasNextPage=hasNextPage)
        except models.Card.DoesNotExist:
            raise Exception('Card not found')

    else:
        return types.GetCardsResponse(cards=None, page=nextPage, hasNextPage=hasNextPage)


@login_required
def resolve_get_comments(self, info, **kwargs):

    cardId = kwargs.get('cardId')
    user = info.context.user

    try:
        card = models.Card.objects.get(id=cardId)
    except models.Card.DoesNotExist:
        raise Exception('Card not found')

    comments = card.comments.all().order_by('created_at')
    return types.GetCommentsResponse(comments=comments)


@login_required
def resolve_card_likes(self, info, **kwargs):

    cardId = kwargs.get('cardId')
    user = info.context.user

    try:
        card = models.Card.objects.get(id=cardId)
    except models.Card.DoesNotExist:
        raise Exception('Card not found')

    users = card.card_likes.all()
    return types.CardLikeResponse(users=users)


@login_required
def resolve_card_detail(self, info, **kwargs):

    cardId = kwargs.get('cardId')
    user = info.context.user

    if cardId:
        try:
            card = models.Card.objects.get(id=cardId)
        except models.Card.DoesNotExist:
            raise Exception('Card not found')

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

    cards = models.Card.objects.all().order_by('-created_at')[:10]
    return types.LatestCardsResponse(cards=cards)


@login_required
def resolve_get_duration_cards(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 12 * page

    cityName = kwargs.get('cityName')
    startDate = kwargs.get('startDate')
    endDate = kwargs.get('endDate')

    nextPage = page+1

    try:
        city = location_models.City.objects.get(city_name=cityName)
        cards = city.cards.filter(created_at__range=(startDate, endDate))
        cardCount = cards.count()
        cards = cards[offset:12 + offset]
        hasNextPage = offset < cardCount
        print(hasNextPage)
        return types.DurationCardsResponse(cards=cards,page=nextPage, hasNextPage=hasNextPage)

    except models.Card.DoesNotExist:
        raise Exception('Card not found')
