import graphene
from graphene_django.types import DjangoObjectType
from config import types as config_types
from . import models

class VerificationType(DjangoObjectType):

    class Meta:
        model = models.Verification

class GetVerificationsResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    verifications = graphene.List(VerificationType)

class MarkAsVerifiedResponse(graphene.ObjectType):
    ok = graphene.Boolean()

class StartPhoneVerificationResponse(graphene.ObjectType):
    ok = graphene.Boolean()

# class CompletePhoneVerificationResponse(graphene.ObjectType):
#     pass
#     ok = graphene.Boolean()
#     token = graphene.String()
