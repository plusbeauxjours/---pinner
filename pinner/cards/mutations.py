import graphene
from django.db import IntegrityError
from . import models, types
from graphql_jwt.decorators import login_required
from notifications import models as notification_models
from locations import models as location_models


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
                actor=user, verb="upload", card=card
            )
            return types.UploadCardResponse(ok=True, card=card)
        except IntegrityError as e:
            print(e)
            raise Exception("Can't create the card")


class EditCard(graphene.Mutation):

    class Arguments:
        cardId = graphene.Int(required=True)
        caption = graphene.String()
        cityName = graphene.String()

    Output = types.EditCardResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user
        cardId = kwargs.get('cardId')

        try:
            card = models.Card.objects.get(id=cardId)
        except models.Card.DoesNotExist:
            raise Exception("Cannot find Card")

        if card:
            cityName = kwargs.get('cityName', card.city.city_name)
            caption = kwargs.get('caption', card.caption)

            try:
                city = location_models.City.objects.get(city_name=cityName)
            except models.Card.DoesNotExist:
                raise Exception("Cannot find City")

            if card.creator.id != user.id:

                error = "Unauthorized"
                return types.EditCardResponse( card=None)

            else:

                try:
                    card.caption = caption
                    card.city = city
                    card.save()
                    return types.EditCardResponse( card=card)
                except IntegrityError as e:
                    print(e)
                    return types.EditCardResponse( card=None)

        else:
            return types.EditCardResponse( card=None)


class DeleteCard(graphene.Mutation):

    class Arguments:
        cardId = graphene.Int(required=True)

    Output = types.DeleteCardResponse

    @login_required
    def mutate(self, info, **kwargs):

        user = info.context.user
        cardId = kwargs.get('cardId')


        try:
            card = models.Card.objects.get(id=cardId)
        except models.Card.DoesNotExist:
            return types.DeleteCardResponse(ok=False, cardId=None)

        if card.creator.id == user.id:

            card.delete()
            return types.DeleteCardResponse(ok=True, cardId=cardId)

        else:
            return types.DeleteCardResponse(ok=False, cardId=None)



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
                    actor=user, target=card.creator, verb='like', card=card
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
                    actor=user, target=card.creator, verb="like", card=card
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

            comment = models.Comment.objects.create(
                message=message, card=card, creator=user)
            if (comment.creator.id is not card.creator.id):
                notification_models.Notification.objects.create(
                    actor=user, target=card.creator, verb="comment", card=card, comment=comment
                )
            return types.AddCommentResponse(comment=comment)

        except models.Card.DoesNotExist:
            return types.AddCommentResponse(comment=None)


class EditComment(graphene.Mutation):

    class Arguments:
        cardId = graphene.Int(required=True)
        commentId = graphene.Int(required=True)
        message = graphene.String()

    Output = types.EditCommentResponse

    @login_required
    def mutate(self, info, **kwargs):

        cardId = kwargs.get('cardId')
        commentId = kwargs.get('commentId')
        message = kwargs.get('message')

        user = info.context.user

        try:
            card = models.Card.objects.get(id=cardId)

            try:
                comment = models.Comment.objects.get(id=commentId)

                if comment.creator.id == user.id or card.creator.id == user.id:

                    message = kwargs.get('message', comment.message)
                    comment.message = message
                    comment.edited = True
                    comment.save()

                    return types.EditCommentResponse(comment=comment)

                else:
                    return types.EditCommentResponse(comment=None)

            except models.Comment.DoesNotExist:
                return types.EditCommentResponse(comment=None)

        except models.Card.DoesNotExist:
            return types.EditCommentResponse(comment=None)



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
                    return types.DeleteCommentResponse(ok=True, cardId=cardId, commentId=commentId)

                else:
                    return types.DeleteCommentResponse(ok=False, cardId=None, commentId=None)

            except models.Comment.DoesNotExist:
                return types.DeleteCommentResponse(ok=False, cardId=None, commentId=None)

        except models.Card.DoesNotExist:
            return types.DeleteCommentResponse(ok=False, cardId=None, commentId=None)



class ToggleLikeComment(graphene.Mutation):

    """ Like a Card """

    class Arguments:
        cardId = graphene.Int(required=True)
        commentId = graphene.Int(required=True)

    Output = types.ToggleLikeCommentResponse

    @login_required
    def mutate(self, info, **kwargs):

        cardId = kwargs.get('cardId')
        commentId = kwargs.get('commentId')
        user = info.context.user

        try:
            card = models.Card.objects.get(id=cardId)
        except models.Card.DoesNotExist:
            raise Exception("Card Not Found")

        try:
            comment = models.Comment.objects.get(id=commentId)
        except models.Comment.DoesNotExist:
            raise Exception("Comment Not Found")

        if comment.creator.id == user.id:

            try:
                like = models.LikeComment.objects.get(
                    creator=user, comment=comment)
                like.delete()
                try:
                    notification = notification_models.Notification.objects.get(
                        actor=user, target=comment.creator, verb='like_comment', card=card, comment=comment
                    )
                    notification.delete()
                    return types.ToggleLikeCommentResponse(ok=True)
                except:
                    pass
                return types.ToggleLikeCommentResponse(ok=True)

            except models.LikeComment.DoesNotExist:
                pass

            try:
                like = models.LikeComment.objects.create(
                    creator=user, comment=comment)
                if (like.creator.id is not comment.creator.id):
                    notification_models.Notification.objects.create(
                        actor=user, target=comment.creator, verb="like_comment", card=card, comment=comment
                    )
                return types.ToggleLikeCommentResponse(ok=True)

            except IntegrityError as e:
                raise Exception("Can't Like Card")
        else:
            return types.ToggleLikeCommentResponse(ok=False)
