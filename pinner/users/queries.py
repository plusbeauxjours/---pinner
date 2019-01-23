import graphene
from django.contrib.auth.models import User
from . import types, models

def resolve_profile(self, info, **kwargs):

    userId = kwargs.get('userId')
    user = info.context.user

    ok = True
    error = None

    if user.is_authenticated:

        try:
            user = User.objects.get(id=userId)
        except User.DoesnotExist:
            error = 'User Not Found'
            return types.UserProfileResponse(ok=not ok, error=error)

        return types.UserProfileResponse(ok=ok, error=error, user=user)

    else: 
        
        error = "You need to be authenticated"
        return types.UserProfileResponse(ok=not ok, error=error)
    
def resolve_me(self, info, **kwargs):

    user = info.context.user 

    ok = True
    error = None

    if user.is_authenticated:

        return types.UserProfileResponse(ok=ok, error=error, user=usre)

    else:

        error = 'You need to be authenticated'
        return types.UserProfileResponse(ok=not ok, error=error)