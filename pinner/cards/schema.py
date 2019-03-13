import graphene
from . import types, queries, mutations


class Query(object):

    feed = graphene.Field(
        types.FeedResponse,
        resolver=queries.resolve_feed,
        required=True,
        args={
            'cityName': graphene.String(required=True),
            'page': graphene.Int(),
        }
    )
    feed_by_city = graphene.Field(
        types.FeedByCityResponse,
        resolver=queries.resolve_feed_by_city,
        required=True,
        args={
            'cityName': graphene.String(required=True),
            'page': graphene.Int()
        }
    )
    card_likes = graphene.Field(
        types.CardLikeResponse,
        resolver=queries.resolve_card_likes,
        required=True,
        args={'cardId': graphene.Int(required=True)}
    )
    card_detail = graphene.Field(
        types.CardDetailResponse,
        resolver=queries.resolve_card_detail,
        required=True,
        args={'cardId': graphene.Int(required=True)}
    )
    search_cards = graphene.Field(
        types.SearchCardsResponse,
        resolver=queries.resolve_search_cards,
        required=True,
        args={'term': graphene.String(required=True)}
    )
    latest_cards = graphene.Field(
        types.LatestCardsResponse,
        resolver=queries.resolve_latest_cards,
        required=True
    )


class Mutation(object):

    like_card = mutations.LikeCard.Field(required=True)
    add_comment = mutations.AddComment.Field(required=True)
    delete_comment = mutations.DeleteComment.Field(required=True)
    edit_card = mutations.EditCard.Field(required=True)
    delete_card = mutations.DeleteCard.Field(required=True)
    upload_card = mutations.UploadCard.Field(required=True)
