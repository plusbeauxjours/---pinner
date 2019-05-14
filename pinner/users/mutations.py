import graphene
from django.db import IntegrityError
from django.contrib.auth.models import User
from graphql_jwt.decorators import login_required
from graphql_jwt.shortcuts import get_token

from . import models, types

from cards import models as card_models
from notifications import models as notification_models


class FollowUser(graphene.Mutation):

    """ Follow User """

    class Arguments:
        userId = graphene.Int(required=True)

    Output = types.FollowUnfollowResponse

    @login_required
    def mutate(self, info, **kwargs):

        userId = kwargs.get('userId')
        user = info.context.user

        try:
            target = User.objects.get(id=userId)
        except User.DoesNotExist:
            raise Exception('User Not Found')

        if target.profile in user.profile.followings.all():

            user.profile.followings.remove(target.profile)
            target.profile.followers.remove(user.profile)

            try:
                notification = notification_models.Notification.objects.get(
                    actor=user, target=target, verb="follow")
                notification.delete()
            except notification_models.Notification.DoesNotExist as e:
                print(e)
                pass

        else:

            user.profile.followings.add(target.profile)
            target.profile.followers.add(user.profile)

            try:
                notification_models.Notification.objects.create(
                    actor=user, target=target, verb="follow")
            except IntegrityError as e:
                print(e)
                pass

        return types.FollowUnfollowResponse(ok=True, user=target)


class EditProfile(graphene.Mutation):

    class Arguments:
        bio = graphene.String()
        gender = graphene.String()
        avatar = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        username = graphene.String()

    Output = types.EditProfileResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user

        profile = user.profile

        if user.is_authenticated and profile is not None:

            bio = kwargs.get('bio', user.profile.bio)
            gender = kwargs.get('gender', user.profile.gender)
            avatar = kwargs.get('avatar', user.profile.avatar)
            first_name = kwargs.get('first_name', user.first_name)
            last_name = kwargs.get('last_name', user.last_name)
            username = kwargs.get('username', user.username)

            try:
                profile.bio = bio
                profile.gender = gender
                profile.avatar = avatar

                user.first_name = first_name
                user.last_name = last_name
                user.username = username

                profile.save()
                user.save()

            except IntegrityError as e:
                print(e)
                error = "Can't save"
                return types.EditProfileResponse(ok=False)

            return types.EditProfileResponse(ok=True, user=user)

        else:
            error = 'You need to log in'
            return types.EditProfileResponse(ok=False)


class DeleteProfile(graphene.Mutation):

    """ Delete Profile """

    Output = types.DeleteProfileResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user

        try:
            user.delete()
            user.profile.delete()
            return types.DeleteProfileResponse(ok=True)

        except IntegrityError as e:
            print(e)
            return types.DeleteProfileResponse(ok=False)


class ChangePassword(graphene.Mutation):

    class Arguments:

        oldPassword = graphene.String(required=True)
        newPassword = graphene.String(required=True)

    Output = types.ChangePasswordResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user
        oldPassword = kwargs.get('oldPassword')
        newPassword = kwargs.get('newPassword')

        ok = True
        error = None


        if user.check_password(oldPassword):

            user.set_password(newPassword)

            user.save()

            return types.ChangePasswordResponse(ok=ok, error=error)

        else:

            error = 'Current password is wrong'
            return types.ChangePasswordResponse(ok=not ok, error=error)


class CreateAccount(graphene.Mutation):

    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        avatar = graphene.String()

    Output = types.CreateAccountResponse

    def mutate(self, info, **kwargs):

        first_name = kwargs.get('first_name')
        last_name = kwargs.get('last_name')
        username = kwargs.get('username')
        email = kwargs.get('email')
        password = kwargs.get('password')
        avatar = kwargs.get('avatar', None)

        try:
            existing_user = User.objects.get(username=username)
            raise Exception("Username is already taken")
        except User.DoesNotExist:
            pass

        try:
            user = User.objects.create_user(username, email, password)
            user.first_name = first_name
            user.last_name = last_name
            user.save()
        except IntegrityError as e:
            print(e)
            raise Exception("Can't Create Account")

        try:
            profile = models.Profile.objects.create(
                user=user,
                avatar=avatar
            )
            token = get_token(user)
            return types.CreateAccountResponse(token=token)
        except IntegrityError as e:
            print(e)
            raise Exception("Can't Create Account")


class FacebookConnect(graphene.Mutation):

    class Arguments:
        username = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        gender = graphene.String()
        fbId = graphene.String(required=True)

    Output = types.FacebookConnectResponse

    def mutate(self, info, **kwargs):

        username = kwargs.get('username')
        first_name = kwargs.get('first_name')
        last_name = kwargs.get('last_name')
        email = kwargs.get('email')
        gender = kwargs.get('gender')
        fbId = kwargs.get('fbId')

        try:
            existingUser = models.Profile.objects.get(
                fbId=fbId
            )
            token = get_token(existingUser.user)
            return types.FacebookConnectResponse(ok=True, token=token)

        except:
            pass

        try:
            newUser = User.objects.create_user(username, email)
            newUser.first_name = first_name
            newUser.last_name = last_name
            newUser.save()
            profile = models.Profile.objects.create(
                user=newUser,
                fbId=fbId,
                gender=gender,
                avatar='http://graph.facebook.com/{}/picture?type=large'.format(fbId)
            )
            token = get_token(newUser)
            return types.FacebookConnectResponse(ok=True, token=token)

        except IntegrityError as e:
            raise Exception("Could not log you in")
