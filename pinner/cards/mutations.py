import graphene
from django.db import IntegrityError
from . import models, types
from graphql_jwt.decorators import login_required
from notifications import models as notification_models
from locations import models as location_models


class LikeCard(graphene.Mutation):

    """ Like a Card """

    class Arguments:
        cardId = graphene.Int(required=True)

    Output = types.LikeCardResponse

    @login_required
    def mutate(self, info, **kwargs):

        cardId = kwargs.get('cardId')
        user = info.context.user

        try:
            card = models.Card.objects.get(id=cardId)
        except models.Card.DoesNotExist:
            raise Exception("Card Not Found")

        try:
            like = models.Like.objects.get(
                creator=user, card=card)
            like.delete()
            try:
                notification = notification_models.Notification.objects.get(
                    actor=user, target=card.creator, verb='like', payload=card
                )
                notification.delete()
                return types.LikeCardResponse(ok=True)
            except:
                pass
            return types.LikeCardResponse(ok=True)

        except models.Like.DoesNotExist:
            pass

        try:
            like = models.Like.objects.create(
                creator=user, card=card)
            if (like.creator.id is not card.creator.id):
                notification_models.Notification.objects.create(
                    actor=user, target=card.creator, verb="like", payload=card
                )
            return types.LikeCardResponse(ok=True)

        except IntegrityError as e:
            raise Exception("Can't Like Card")


class AddComment(graphene.Mutation):

    """ Add Comment """

    class Arguments:
        cardId = graphene.Int(required=True)
        message = graphene.String(required=True)

    Output = types.AddCommentResponse

    @login_required
    def mutate(self, info, **kwargs):

        cardId = kwargs.get('cardId')
        message = kwargs.get('message')
        user = info.context.user
        comment = None

        try:
            card = models.Card.objects.get(id=cardId)
        except models.Card.DoesNotExist:
            raise Exception('Card Not Found')

        try:
            comment = models.Comment.objects.create(
                message=message, card=card, creator=user)
            if (comment.creator.id is not card.creator.id):
                notification_models.Notification.objects.create(
                    actor=user, target=card.creator, verb="comment", payload=card, comment=comment
                )
            return types.AddCommentResponse(comment=comment)

        except IntegrityError as e:
            print(e)
            raise Exception("Can't create the comment")


class DeleteComment(graphene.Mutation):

    class Arguments:
        cardId = graphene.Int(required=True)
        commentId = graphene.Int(required=True)

    Output = types.DeleteCommentResponse

    @login_required
    def mutate(self, info, **kwargs):

        cardId = kwargs.get('cardId')
        commentId = kwargs.get('commentId')
        user = info.context.user

        try:
            card = models.Card.objects.get(id=cardId)

            try:
                comment = models.Comment.objects.get(id=commentId)

                if comment.creator.id == user.id or card.creator.id == user.id:
                    comment.delete()
                    return types.AddCommentResponse(comment=comment)

                else:
                    error = "Can't Delete Comment"

                return types.DeleteCommentResponse(ok=True)

            except models.Comment.DoesNotExist:
                error = 'Comment Not Found'
                return types.DeleteCommentResponse(ok=False)

        except models.Card.DoesNotExist:
            error = 'Card Not Found'
            return types.DeleteCommentResponse(ok=False)


class EditCard(graphene.Mutation):

    class Arguments:
        cardId = graphene.Int(required=True)
        caption = graphene.String()
        country = graphene.String()
        city = graphene.String()

    Output = types.EditCardResponse

    def mutate(self, info, **kwargs):

        user = info.context.user
        cardId = kwargs.get('cardId')

        if user.is_authenticated:

            try:
                card = models.Card.objects.get(id=cardId)
            except models.Card.DoesNotExist:
                error = "Card Not Found"
                return types.EditCardResponse(ok=False)

            if card.creator.id != user.id:

                error = "Unauthorized"
                return types.EditCardResponse(ok=False)

            else:

                try:

                    caption = kwargs.get('caption', card.caption)
                    country = kwargs.get('country', card.country)
                    city = kwargs.get('city', card.city)

                    card.caption = caption
                    card.country = country
                    card.city = city

                    card.save()
                    return types.EditCardResponse(ok=True, card=card)
                except IntegrityError as e:
                    print(e)
                    error = "Can't Save Card"
                    return types.EditCardResponse(ok=False)

        else:
            error = "You need to log in"
            return types.EditCardResponse(ok=False)


class DeleteCard(graphene.Mutation):

    class Arguments:
        cardId = graphene.Int(required=True)

    Output = types.DeleteCardResponse

    def mutate(self, info, **kwargs):

        user = info.context.user
        cardId = kwargs.get('cardId')

        if user.is_authenticated:

            try:
                card = models.Card.objects.get(id=cardId)
            except models.Card.DoesNotExist:
                error = "Card Not Found"
                return types.DeleteCardResponse(ok=False)

            if card.creator.id == user.id:

                card.delete()
                return types.DeleteCardResponse(ok=True)

            else:

                error = "Unauthorized"
                return types.DeleteCardResponse(ok=False)

        else:
            error = "You need to log in"
            return types.DeleteCardResponse(ok=False)


class UploadCard(graphene.Mutation):

    class Arguments:
        caption = graphene.String(required=True)

    Output = types.UploadCardResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user
        city = user.profile.current_city
        country = user.profile.current_city.country

        caption = kwargs.get('caption')

        try:
            country = location_models.Country.objects.get(country_name=country)
            city = location_models.City.objects.get(city_name=city)
            card = models.Card.objects.create(
                creator=user,
                caption=caption,
                city=city,
                country=country,
            )
            notification_models.Notification.objects.create(
                actor=user, verb="upload", payload=card
            )
            return types.UploadCardResponse(ok=True, card=card)
        except IntegrityError as e:
            print(e)
            raise Exception("Can't create the card")
