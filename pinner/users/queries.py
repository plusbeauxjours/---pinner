import graphene
from . import types, models
from .models import User

def resolve_profile(self, info, **kwargs):

    userId = kwargs.get('userId')
    user = info.context.user

    ok = True
    error = None

    if user.is_authenticated:

        try:
            profile = User.objects.get(id=userId)
        except User.DoesNotExist:
            error = 'User Not Found'
            return types.UserProfileResponse(ok=not ok, error=error)

        return types.UserProfileResponse(ok=ok, error=error, user=profile)

    else: 
        
        error = "You need to be authenticated"
        return types.UserProfileResponse(ok=not ok, error=error)
    
def resolve_me(self, info):

    user = info.context.user 

    ok = True
    error = None

    if user.is_authenticated:

        return types.UserProfileResponse(ok=ok, error=error, user=user)

    else:

        error = 'You need to be authenticated'
        return types.UserProfileResponse(ok=not ok, error=error)