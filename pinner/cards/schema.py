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
    get_duration_cards = graphene.Field(
        types.DurationCardsResponse,
        resolver=queries.resolve_get_duration_cards,
        required=True,
        args={
            'page': graphene.Int(),
            'cityName': graphene.String(required=True),
            'startDate': graphene.Date(required=True),
            'endDate': graphene.Date(required=True)
        }
    )
    get_comments = graphene.Field(
        types.GetCommentsResponse,
        resolver=queries.resolve_get_comments,
        required=True,
        args={'cardId': graphene.Int(required=True)}
    )
    get_cards = graphene.Field(
        types.GetCardsResponse,
        resolver=queries.resolve_get_cards,
        required=True,
        args={'page': graphene.Int(),
              'location': graphene.String(required=True),
              'cityName': graphene.String(),
              'countryName': graphene.String(),
              'continentName': graphene.String(),
              'userName': graphene.String()
        }
    )
    get_feed_cards = graphene.Field(
        types.GetCardsResponse,
        resolver=queries.resolve_get_feed_cards,
        required=True,
        args={'page': graphene.Int(),
              'cityName': graphene.String(),
        }
    )
    


class Mutation(object):

    upload_card = mutations.UploadCard.Field(required=True)
    edit_card = mutations.EditCard.Field(required=True)
    delete_card = mutations.DeleteCard.Field(required=True)
    toggle_like_card = mutations.ToggleLikeCard.Field(required=True)

    add_comment = mutations.AddComment.Field(required=True)
    edit_comment = mutations.EditComment.Field(required=True)
    delete_comment = mutations.DeleteComment.Field(required=True)
    toggle_like_comment = mutations.ToggleLikeComment.Field(required=True)

