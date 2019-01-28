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

def resolve_search_users(self, info, **kwargs):

    user = info.context.user
    term = kwargs.get('term')

    ok = True
    error = None

    if user.is_authenticated:

        if len(term) < 3:

            error = "Search Term is Too Short"
            return types.SearchUsersResponse(ok=not ok, error=error)

        else:

            users = User.objects.filter(username__istartswitch=term)

            return types.SearchUsersResponse(ok=ok, error=error)
        
    else:

        error = "Unauthorized"
        return types.SearchUsersResponse(ok=not ok, error=error)
    
def resolve_check_username(self, info, **kwargs):

    user = info.context.user
    username = kwargs.get('username')

    ok = True
    error = None

    if user.is_authenticated:

        try:
            existing_username = User.objects.get(username=username)
            error = "Username is taken"
            return types.CheckUsernameResponse(ok=not ok, error=error)

    else:

        error = "Unauthorized"
        return types.CheckUsernameResponse(ok=not ok, error=error)