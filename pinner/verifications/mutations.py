import random
import math
import json

import uuid
import graphene
from django.db import IntegrityError
from graphql_jwt.decorators import login_required
from graphql_jwt.shortcuts import get_token
from users import models as users_models
from django.contrib.auth.models import User
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
            verification.verified = True
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
            existingVerification.delete()

        except IntegrityError as e:
            raise Exception("Wrong Phone Number")

        finally:
            newVerification = models.Verification.objects.create(
                payload=phoneNumber,
                target="Phone"
            )
            newVerification.save()
            sendSMS.sendVerificationSMS(newVerification.payload, newVerification.key)
            return types.StartPhoneVerificationResponse(ok=True)


class CompletePhoneVerification(graphene.Mutation):

    class Arguments:
        phoneNumber = graphene.String(required=True)
        key = graphene.String(required=True)
        cityId = graphene.String(required=True)

    Output = types.CompletePhoneVerificationResponse

    def mutate(self, info, **kwargs):

        phoneNumber = kwargs.get('phoneNumber')
        key = kwargs.get('key')
        cityId = kwargs.get('cityId')

        try:
            verification = models.Verification.objects.get(
                payload=phoneNumber,
                key=key
            )

            try:
                exstingUserProfile = users_models.Profile.objects.get(phone_number=phoneNumber)
                if (exstingUserProfile.verified_phone_number == False):
                    exstingUserProfile.verified_phone_number == True
                    exstingUserProfile.save()
                token = get_token(exstingUserProfile.user)
                return types.CompletePhoneVerificationResponse(ok=True, token=token)

            except users_models.Profile.DoesNotExist:
                pass

            try:
                with open('pinner/users/adjectives.json', mode='rt', encoding='utf-8') as adjectives:
                    with open('pinner/users/nouns.json', mode='rt', encoding='utf-8') as nouns:
                        adjectives = json.load(adjectives)
                        nouns = json.load(nouns)
                        username = random.choice(adjectives) + random.choice(nouns).capitalize()
                        newUser = User.objects.create_user(username=username)
                        token = get_token(newUser)
                        city = location_models.City.objects.get(city_id=cityId)
                        newUserProfile = users_models.Profile.objects.create(
                            user=newUser,
                            phone_number=phoneNumber,
                            current_city=city
                        )
                        newUserProfile.verified_phone_number = True
                        newUserProfile.save()
                        return types.CompletePhoneVerificationResponse(ok=True, token=token)

            except IntegrityError as e:
                raise Exception("No Phone to Verify")

            verification.verified = True
            verification.save()
        except models.Verification.DoesNotExist:
            raise Exception('Verification key not valid')
