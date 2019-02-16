import graphene

from cards import schema as cards_schema
from users import schema as users_schema
from notifications import schema as notifications_schema
from verifications import schema as verifications_schema


class Query(
    cards_schema.Query, users_schema.Query, 
    notifications_schema.Query, 
    verifications_schema.Query, 
    graphene.ObjectType
    ):
    pass

class Mutation(
    cards_schema.Mutation, 
    users_schema.Mutation, 
    notifications_schema.Mutation, 
    verifications_schema.Mutation, 
    graphene.ObjectType
    ):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)