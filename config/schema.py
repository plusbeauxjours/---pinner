import graphene

from cards import schema as cards_schema

class Query(cards_schema.Query, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query)