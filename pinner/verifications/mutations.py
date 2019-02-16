import graphene
from graphql_jwt.decorators import login_required
from . import models, types

class MarkAsVerified(graphene.Mutation):

    class Arguments:
        verificationId = graphene.Int(required=True)

    Output = types.MarkAsVerifiedResponse

    @login_required
    def mutate(self, info, **kwargs):

        verificationId = kwargs.get('verificationId')
        user = info.context.user

        try:
            verification = models.Verification.objects.get(
                id=verificationId
            )
            verification.verified=True
            verification.save()
            return types.MarkAsVerifiedResponse(ok=True)
            
        except models.Verification.DoesNotExist:
            raise Exception('Verification Not Found')
            