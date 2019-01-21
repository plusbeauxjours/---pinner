import graphene
from graphene_django.types import DjangoObjectType
from . import models
from django.contrib.auth.models import User
from config import types as config_types

class CardType(DjangoObjectType):

    class Meta: 
        model = User

class UserProfileResponse(graphene.ObjectType, config_types.ResponseFields):
    user = graphene.Field(UserType)