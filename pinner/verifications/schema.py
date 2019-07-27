import graphene
from . import types, queries, mutations


class Query(object):

    get_verifications = graphene.Field(
        types.GetVerificationsResponse,
        resolver=queries.resolve_get_verifications,
        required=True,
        args={'payload': graphene.String()}
    )


class Mutation(object):

    mark_as_verified = mutations.MarkAsVerified.Field(required=True)
    start_phone_verification = mutations.StartPhoneVerification.Field(required=True)
    complete_phone_verification = mutations.CompletePhoneVerification.Field(required=True)
    complete_edit_phone_verification = mutations.CompleteEditPhoneVerification.Field(required=True)
