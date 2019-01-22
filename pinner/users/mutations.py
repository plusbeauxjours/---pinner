import graphene
from . import models, types
from django.contrib.auth.models import User

class FoloowUser(graphene.Mutation):

    class Arguments:
        userId = graphene.Int(required=True)

    Output = types.FollowUnfollowResponse

    def mutate(self, info, **kwargs):

        userId = kwargs.get('userId')
        user = info.context.user

        ok=True
        error = None

        if user.is_authenticated:

            try:
                target = User.objects.get(id=userId)
            except User.DoesNotExist:
                error = 'User Not Found'
                return types.FollowUnfollowResponse(ok=not ot, error=error)

            user.following.add(target)
            target.follwers.add(user)

            return types.FollowUnfollowResponse(ok=ok, error=error)

        else:
            error = 'You need to log in'
            return types.FollowUnfollowResponse(ok=not ok, error=error)

class UnfollowUser(graphene.Mutation):

    class Arguments:
        userId = graphene.Int(required=True)
    
    Output = types.FollowUnfollowResponse

    def mutate(self, info, **kwargs):

        userId = kwargs.get('userId')
        user = info.context.user

        ok = True
        error = None

        if user.is_authenticated:

            try:
                target = User.objects.get(id=userId)
            except User.DoesNotExist:
                error = 'User Not Found'
                return types.FollowUnfollowResponse(ok=not ok, error=error)
            
            user.following.remove(target)
            target.followers.remove(user)

            return types.FollowUnfollowResponse(ok=ok, error=error)

        else: 
            error = 'You need to log in'
            return types.FollowUnfollowResponse(ok=not ok, error=error)