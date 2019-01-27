import graphene
from . import models, types
from .models import User
from django.db import IntegrityError

class FollowUser(graphene.Mutation):

    """ Follow User """

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

            user.following.add(target)
            target.followers.add(user)

            return types.FollowUnfollowResponse(ok=ok, error=error)

        else:
            error = 'You need to log in'
            return types.FollowUnfollowResponse(ok=not ok, error=error)


class UnfollowUser(graphene.Mutation):

    """ Follow User """

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

class EditProfile(graphene.Mutation):

    class Arguments:
        bio = graphene.String()
        website = graphene.String()
        gender = graphene.String()
        avatar = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        username = graphene.String()

    Output = types.EditProfileResponse

    def mutate(self, info, **kwargs):

        user = info.context.user

        ok = True
        error = None

        profile = user.profile
        
        if user.is_authenticated and profile is not None:

            bio = kwargs.get('bio', user.profile.bio)
            website = kwargs.get('website', user.profile.website)
            gender = kwargs.get('gender', user.profile.gender)
            avatar = kwargs.get('avatar', user.profile.avatar)
            first_name = kwargs.get('first_name', user.first_name)
            last_name = kwargs.get('last_name', user.last_name)
            email = kwargs.get('email', user.email)
            username = kwargs.get('username', user.username)

            try:
                user.profile.bio = bio
                user.profile.website = website
                user.profile.gender = gender
                user.profile.avatar = avatar

                user.first_name = first_name
                user.last_name = last_name
                user.email = email
                user.username = username

                user.profile.save()
                user.save()

            except IntegrityError:
                error = "Can't save"
                return types.EditProfileResponse(ok=not ok, error=error)

            return types.EditProfileResponse(ok=ok, error=error)

        else:
            error = "You need to log in"
            return types.EditProfileResponse(ok=not ok, error=error)

class ChangePassword(graphene.Mutation):

    class Arguments:

        oldPassword = graphene.String(required=True)
        newPassword = graphene.String(required=True)

    Output = types.ChangePasswordResponse

    def mutate(self, info, **kwargs):

        user = info.context.user
        oldPassword = kwargs.get('oldPassword')
        newPassword = kwargs.get('newPassword')

        ok = True
        error = None

        if user.is_authendticated:

            if user.check_password(oldPassword):

                user.setPpassword(newPassword)

                user.save()

                return types.ChangePasswordResponse(ok=ok, error=error)

            else:

                error = 'Current password is wrong'
                return types.ChangePasswordResponse(ok=not ok, error=error)

        else: 
            error = 'You need to log in'
            return types.ChangePasswordResponse(ok=not ok, error=error)
