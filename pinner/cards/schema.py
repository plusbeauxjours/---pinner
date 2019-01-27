import graphene
from . import types, queries, mutations

class Query(object):

    location = graphene.Field(types.LocationResponse, resolver=queries.resolve_location,)
    feed = graphene.Field(types.FeedResponse, resolver=queries.resolve_feed, required=True)
    card_likes = graphene.Field(
        types.CardLikeResponse, resolver=queries.resolve_card_likes, required=True, args={'cardId':graphene.Int(required=True)})
    card_detail = graphene.Field(
        types.CardDetailResponse, resolver=queries.resolve_card_detail, required=True, args={'cardId':graphene.Int(required=True)})

class Mutation(object):

    like_card = mutations.LikeCard.Field(required=True)
    add_comment = mutations.AddComment.Field(required=True)
    delete_comment = mutations.DeleteComment.Field(required=True)
    edit_card = mutations.EditCard.Field(required=True)
    delete_card = mutations.DeleteCard.Field(required=True)