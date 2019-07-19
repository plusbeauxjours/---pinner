import graphene
import json
from django.db import IntegrityError
from django.contrib.auth.models import User
from graphql_jwt.decorators import login_required
from graphql_jwt.shortcuts import get_token
from graphene_file_upload.scalars import Upload

from locations import locationThumbnail
from locations import models as location_models
from . import models, types

from notifications import models as notification_models


class ToggleSettings(graphene.Mutation):

    class Arguments:
        payload = graphene.String(required=True)

    Output = types.ToggleSettingsResponse

    @login_required
    def mutate(self, info,  **kwargs):

        user = info.context.user
        payload = kwargs.get('payload')
        if payload == "DARK_MODE":
            if user.profile.is_dark_mode == True:
                try:
                    user.profile.is_dark_mode = False
                    user.profile.save()
                    return types.ToggleSettingsResponse(ok=True, user=user)
                except:
                    return types.ToggleSettingsResponse(ok=False, user=None)
            elif user.profile.is_dark_mode == False:
                try:
                    user.profile.is_dark_mode = True
                    user.profile.save()
                    return types.ToggleSettingsResponse(ok=True, user=user)
                except:
                    return types.ToggleSettingsResponse(ok=False, user=None)
        elif payload == "HIDE_TRIPS":
            if user.profile.is_hide_trips == True:
                try:
                    user.profile.is_hide_trips = False
                    user.profile.save()
                    return types.ToggleSettingsResponse(ok=True, user=user)
                except:
                    return types.ToggleSettingsResponse(ok=False, user=None)
            elif user.profile.is_hide_trips == False:
                try:
                    user.profile.is_hide_trips = True
                    user.profile.save()
                    return types.ToggleSettingsResponse(ok=True, user=user)
                except:
                    return types.ToggleSettingsResponse(ok=False, user=None)
        elif payload == "HIDE_COFFEES":
            if user.profile.is_hide_coffees == True:
                try:
                    user.profile.is_hide_coffees = False
                    user.profile.save()
                    return types.ToggleSettingsResponse(ok=True, user=user)
                except:
                    return types.ToggleSettingsResponse(ok=False, user=None)
            elif user.profile.is_hide_coffees == False:
                try:
                    user.profile.is_hide_coffees = True
                    user.profile.save()
                    return types.ToggleSettingsResponse(ok=True, user=user)
                except:
                    return types.ToggleSettingsResponse(ok=False, user=None)

        elif payload == "HIDE_CITIES":
            if user.profile.is_hide_cities == True:
                try:
                    user.profile.is_hide_cities = False
                    user.profile.save()
                    return types.ToggleSettingsResponse(ok=True, user=user)
                except:
                    return types.ToggleSettingsResponse(ok=False, user=None)
            elif user.profile.is_hide_cities == False:
                try:
                    user.profile.is_hide_cities = True
                    user.profile.save()
                    return types.ToggleSettingsResponse(ok=True, user=user)
                except:
                    return types.ToggleSettingsResponse(ok=False, user=None)
        elif payload == "HIDE_COUNTRIES":
            if user.profile.is_hide_countries == True:
                try:
                    user.profile.is_hide_countries = False
                    user.profile.save()
                    return types.ToggleSettingsResponse(ok=True, user=user)
                except:
                    return types.ToggleSettingsResponse(ok=False, user=None)
            elif user.profile.is_hide_countries == False:
                try:
                    user.profile.is_hide_countries = True
                    user.profile.save()
                    return types.ToggleSettingsResponse(ok=True, user=user)
                except:
                    return types.ToggleSettingsResponse(ok=False, user=None)
        elif payload == "HIDE_CONTINENTS":
            if user.profile.is_hide_continents == True:
                try:
                    user.profile.is_hide_continents = False
                    user.profile.save()
                    return types.ToggleSettingsResponse(ok=True, user=user)
                except:
                    return types.ToggleSettingsResponse(ok=False, user=None)
            elif user.profile.is_hide_continents == False:
                try:
                    user.profile.is_hide_continents = True
                    user.profile.save()
                    return types.ToggleSettingsResponse(ok=True, user=user)
                except:
                    return types.ToggleSettingsResponse(ok=False, user=None)
        elif payload == "AUTO_LOCATION_REPORT":
            if user.profile.is_auto_location_report == True:
                try:
                    user.profile.is_auto_location_report = False
                    user.profile.save()
                    return types.ToggleSettingsResponse(ok=True, user=user)
                except:
                    return types.ToggleSettingsResponse(ok=False, user=None)
            elif user.profile.is_auto_location_report == False:
                try:
                    user.profile.is_auto_location_report = True
                    user.profile.save()
                    return types.ToggleSettingsResponse(ok=True, user=user)
                except:
                    return types.ToggleSettingsResponse(ok=False, user=None)


class EditProfile(graphene.Mutation):

    class Arguments:
        username = graphene.String()
        bio = graphene.String()
        gender = graphene.String()
        firstName = graphene.String()
        lastName = graphene.String()
        nationality = graphene.String()
        residence = graphene.String()
        email = graphene.String()

    Output = types.EditProfileResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user

        profile = user.profile

        if user.is_authenticated and profile is not None:

            bio = kwargs.get('bio', user.profile.bio)
            gender = kwargs.get('gender', user.profile.gender)
            firstName = kwargs.get('firstName', user.first_name)
            lastName = kwargs.get('lastName', user.last_name)
            username = kwargs.get('username', user.username)
            nationality_code = kwargs.get('nationality', user.profile.nationality)
            residence_code = kwargs.get('residence', user.profile.residence)
            email = kwargs.get('email', user.profile.email)

            try:
                nationality = location_models.Country.objects.get(country_code=nationality_code)
            except location_models.Country.DoesNotExist:
                with open('pinner/locations/countryData.json', mode='rt', encoding='utf-8') as file:
                    countryData = json.load(file)
                    currentCountry = countryData[nationality_code]
                    countryName = currentCountry['name']
                    countryNameNative = currentCountry['native']
                    countryCapital = currentCountry['capital']
                    countryCurrency = currentCountry['currency']
                    countryPhone = currentCountry['phone']
                    countryEmoji = currentCountry['emoji']
                    countryEmojiU = currentCountry['emojiU']
                    continentCode = currentCountry['continent']

                    try:
                        continent = location_models.Continent.objects.get(continent_code=continentCode)
                    except:
                        with open('pinner/locations/continentData.json', mode='rt', encoding='utf-8') as file:
                            continentData = json.load(file)
                            continentName = continentData[continentCode]

                            try:
                                gp = locationThumbnail.get_photos(term=continentName)
                                continentPhotoURL = gp.get_urls()
                            except:
                                continentPhotoURL = None

                            # DOWNLOAD IMAGE
                            # continentPhotoURL = gp.get_urls()
                            # # for i in range(gp.num):
                            # #     print('Downloading...' + str(i) + '/' + str(gp.num))
                            # #     gp.download(i)

                            continent = location_models.Continent.objects.create(
                                continent_name=continentName,
                                continent_photo=continentPhotoURL,
                                continent_code=continentCode
                            )

                try:
                    gp = locationThumbnail.get_photos(term=countryName)
                    countryPhotoURL = gp.get_urls()
                except:
                    countryPhotoURL = None

                # DOWNLOAD IMAGE
                # for i in range(gp.num):
                #     print('Downloading...' + str(i) + '/' + str(gp.num))
                #     gp.download(i)

                nationality = location_models.Country.objects.create(
                    country_code=nationality_code,
                    country_name=countryName,
                    country_name_native=countryNameNative,
                    country_capital=countryCapital,
                    country_currency=countryCurrency,
                    country_phone=countryPhone,
                    country_emoji=countryEmoji,
                    country_emojiU=countryEmojiU,
                    country_photo=countryPhotoURL,
                    continent=continent,
                )

            try:
                residence = location_models.Country.objects.get(country_code=residence_code)
            except location_models.Country.DoesNotExist:
                with open('pinner/locations/countryData.json', mode='rt', encoding='utf-8') as file:
                    countryData = json.load(file)
                    currentCountry = countryData[residence_code]
                    countryName = currentCountry['name']
                    countryNameNative = currentCountry['native']
                    countryCapital = currentCountry['capital']
                    countryCurrency = currentCountry['currency']
                    countryPhone = currentCountry['phone']
                    countryEmoji = currentCountry['emoji']
                    countryEmojiU = currentCountry['emojiU']
                    continentCode = currentCountry['continent']

                    try:
                        continent = location_models.Continent.objects.get(continent_code=continentCode)
                    except:
                        with open('pinner/locations/continentData.json', mode='rt', encoding='utf-8') as file:
                            continentData = json.load(file)
                            continentName = continentData[continentCode]

                            try:
                                gp = locationThumbnail.get_photos(term=continentName)
                                continentPhotoURL = gp.get_urls()
                            except:
                                continentPhotoURL = None

                            # DOWNLOAD IMAGE
                            # continentPhotoURL = gp.get_urls()
                            # # for i in range(gp.num):
                            # #     print('Downloading...' + str(i) + '/' + str(gp.num))
                            # #     gp.download(i)

                            continent = location_models.Continent.objects.create(
                                continent_name=continentName,
                                continent_photo=continentPhotoURL,
                                continent_code=continentCode
                            )

                try:
                    gp = locationThumbnail.get_photos(term=countryName)
                    countryPhotoURL = gp.get_urls()
                except:
                    countryPhotoURL = None

                # DOWNLOAD IMAGE
                # for i in range(gp.num):
                #     print('Downloading...' + str(i) + '/' + str(gp.num))
                #     gp.download(i)

                residence = location_models.Country.objects.create(
                    country_code=residence_code,
                    country_name=countryName,
                    country_name_native=countryNameNative,
                    country_capital=countryCapital,
                    country_currency=countryCurrency,
                    country_phone=countryPhone,
                    country_emoji=countryEmoji,
                    country_emojiU=countryEmojiU,
                    country_photo=countryPhotoURL,
                    continent=continent,
                )

            try:
                profile.bio = bio
                profile.gender = gender
                profile.nationality = nationality
                profile.residence = residence
                profile.email = email
                profile.save()

                user.first_name = firstName
                user.last_name = lastName
                user.username = username
                user.save()
                return types.EditProfileResponse(ok=True, user=user)

            except IntegrityError as e:
                print(e)
                error = "Can't save"
                return types.EditProfileResponse(ok=False, user=None)

        else:
            error = 'You need to log in'
            return types.EditProfileResponse(ok=False, user=None)


class MarkAsMain(graphene.Mutation):

    class Arguments:
        uuid = graphene.String(required=True)

    Output = types.MarkAsMainResponse

    @login_required
    def mutate(self, info,  **kwargs):

        user = info.context.user
        uuid = kwargs.get('uuid')

        try:
            prevMainAvatar = models.Avatar.objects.get(
                is_main=True, creator=user)
            if prevMainAvatar:
                newMainAvatar = models.Avatar.objects.get(uuid=uuid)
                prevMainAvatar.is_main = False
                newMainAvatar.is_main = True
                prevMainAvatar.save()
                newMainAvatar.save()
            else:
                newMainAvatar = models.Avatar.objects.get(uuid=uuid)
                newMainAvatar.is_main = True
                newMainAvatar.save()
                return types.MarkAsMainResponse(ok=True, avatar=newMainAvatar,  uuid=uuid)

        except:
            newMainAvatar = models.Avatar.objects.get(uuid=uuid)
            newMainAvatar.is_main = True
            newMainAvatar.save()

        return types.MarkAsMainResponse(ok=True, avatar=newMainAvatar, uuid=uuid)


class DeleteProfile(graphene.Mutation):

    Output = types.DeleteProfileResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user

        try:
            user.profile.delete()
            user.delete()
            return types.DeleteProfileResponse(ok=True)

        except IntegrityError as e:
            print(e)
            return types.DeleteProfileResponse(ok=False)


class UploadAvatar(graphene.Mutation):

    class Arguments:
        file = Upload(required=True)

    Output = types.UploadAvatarResponse

    @login_required
    def mutate(self, info, file, **kwargs):

        user = info.context.user

        try:
            prevMainAvatar = models.Avatar.objects.get(
                is_main=True, creator=user)
            prevMainAvatar.is_main = False
            newMainAvatar = models.Avatar.objects.create(
                is_main=True, image=file, thumbnail=file, creator=user)
            user.profile.avatar = newMainAvatar
            prevMainAvatar.save()
            user.profile.save()
            return types.UploadAvatarResponse(ok=True, avatar=newMainAvatar)

        except:
            newMainAvatar = models.Avatar.objects.create(
                is_main=True, image=file, thumbnail=file, creator=user)
            user.profile.avatar = newMainAvatar
            user.profile.save()
            return types.UploadAvatarResponse(ok=True, avatar=newMainAvatar)


class DeleteAvatar(graphene.Mutation):

    class Arguments:
        uuid = graphene.String(required=True)

    Output = types.DeleteAvatarResponse

    @login_required
    def mutate(self, info,  **kwargs):

        user = info.context.user
        uuid = kwargs.get('uuid')

        try:
            avatar = models.Avatar.objects.get(uuid=uuid)
            if not avatar.is_main:
                avatar.delete()
            return types.DeleteAvatarResponse(ok=True, uuid=uuid)

        except:
            return types.DeleteAvatarResponse(ok=False, uuid=uuid)


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

    Output = types.CreateAccountResponse

    def mutate(self, info, **kwargs):

        first_name = kwargs.get('first_name')
        last_name = kwargs.get('last_name')
        username = kwargs.get('username')
        email = kwargs.get('email')
        password = kwargs.get('password')

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
