import graphene
from graphene_django.types import DjangoObjectType
from django.contrib.auth.models import User

class ResponseFields(graphene.AbstractType):
    ok = graphene.Boolean(required=True)
    error = graphene.String()

class UserType(DjangoObjectType):

    class Meta:
        model = User
        exclude_fields = ('password',)

