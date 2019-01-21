import graphene
from . import types, queries, mutations

class Query(object):

    feed = graphene.Field(types.FeedResponse, resolver=queries.resolve_feed, required=True)
    card_likes = graphene.Field(
        types.CardLikeResponse, resolver=queries.resolve_card_likes, required=True, cardId=graphene.Int(required=True)
    )

class Mutation(object):

    like_card = mutations.LikeCard.Field(required=True)
    add_comment = mutations.AddComment.Field(requried=True)
    delete_comment = mutations.DeleteComment.Field(required=True)