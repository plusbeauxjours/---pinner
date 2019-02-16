import graphene
from graphql_jwt.decorators import login_required
from django.db import IntegrityError
from . import models, types
from . import sendSMS

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

class StartPhoneVerification(graphene.Mutation):

    class Arguments:
        phoneNumber = graphene.String(required=True)
    
    Output = types.StartPhoneVerificationResponse
    
    def mutate(self, info, **kwargs):

        phoneNumber = kwargs.get('phoneNumber')

        try: 
            existingVerification = models.Verification.objects.get(
                payload=phoneNumber
            )
            if existingVerification:
                existingVerification.delete()
        except:
            pass

        try:
            newVerification = models.Verification.objects.create(
                payload=phoneNumber,
                target="Phone"
            )
            newVerification.save()
            sendSMS.sendVerificationSMS(newVerification.payload, newVerification.key)
            return types.StartPhoneVerificationResponse(ok=True)
        
        except IntegrityError as e:
            raise Exception("Wrong Phone Number")
    
            
# class CompletePhoneVerification(graphene.Mutation):
#     pass