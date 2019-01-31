import graphene
from django.db import IntegrityError
from . import models, types
from notifications import models as notification_models

class LikeCard(graphene.Mutation):

    """ Like a Card """

    class Arguments: 
        cardId = graphene.Int(required=True)

    Output = types.LikeCardResponse

    def mutate(self, info, **kwargs):
        cardId = kwargs.get('cardId')
        user = info.context.user
        ok = True
        error = None
        if user.is_authenticated: 
            try:
                card = models.Card.objects.get(id=cardId)
            except models.Card.DoesNotExist:
                error = 'Card Not Found'
                return types.LikeCardResponse(ok=not ok, error=error)

            try:
                like = models.Like.objects.create(
                    creator=user, card=card)
                like.save()
                return types.LikeCardResponse(ok=ok, error=error)
            except IntegrityError as e:
                print(e)
                error = "Can't Like Card"
                return types.LikeCardResponse(ok=not ok, error=error)
        else: 
            error = 'You need to log in'
            return types.LikeCardResponse(ok=not ok, error=error)

class UnlikeCard(graphene.Mutation):

    """ Unlike a Card """

    class Arguments:
        cardId = graphene.Int(required=True)

    Output = types.UnlikeCardResponse

    def mutate(self, info, **kwargs):
        cardId = kwargs.get('cardId')
        user = info.context.user
        
        ok = True
        error = None

        if user.is_authenticated:
            try:
                card = models.Card.objects.get(id=cardId)
            except models.Card.DoesNotExist:
                error = 'Card Not Found'
                return types.UnlikeCardResponse(ok=not ok, error=error)

            try:
                like = models.Like.objects.get(creator=user, card=card)
                like.delete()
                return types.UnlikeCardResponse(ok=ok, error=error)
            except models.Like.DoesNotExist:
                pass
        
        else:
            error = "You need to log in"
            return types.UnlikeCardResponse(ok=not ok, error=error)

class AddComment(graphene.Mutation):

    """ Add Comment """

    class Arguments: 
        cardId = graphene.Int(required=True)
        message = graphene.String(required=True)

    Output = types.AddCommentResponse

    def mutate(self, info, **kwargs):
        cardId = kwargs.get('cardId')
        message = kwargs.get('message')

        user = info.context.user

        ok = True
        error = None
        comment = None

        if user.is_authenticated:
            try: 
                card = models.Card.objects.get(id=cardId)
            except models.Card.DoesNotExist:
                error = 'Card Not Found'
                return types.AddCommentResponse(ok=not ok, error=error, comment=comment)

            try: 
                comment = models.Comment.objects.create(
                    message=message, card=card, creator=user)
                return types.AddCommentResponse(ok=ok, error=error, comment=comment)
            except IntegrityError as e:
                print(e)
                error = "Can't create the comment"
                return types.AddCommentResponse(ok=not ok, error=error, comment=comment)
        else: 
            error = 'You need to log in'
            return types.AddCommentResponse(ok=not ok, error=error, comment=comment)

class DeleteComment(graphene.Mutation):

    class Arguments:
        cardId = graphene.Int(required=True)
        commentId = graphene.Int(required=True)

    Output = types.DeleteCommentResponse

    def mutate(self, info, **kwargs):
        cardId = kwargs.get('cardId')
        commentId = kwargs.get('commentId')

        user = info.context.user

        ok = True
        error = None

        if user.is_authenticated:

            try: 
                card = models.Card.objects.get(id=cardId)
            except models.Card.DoesNotExist:
                error = 'Card Not Found'
                return types.DeleteCommentResponse(ok=not ok, error=error)

            try: 
                comment = models.Comment.objects.get(id=commentId)
            except models.Comment.DoesNotExist:
                error = 'Comment Not Found'
                return types.DeleteCommentResponse(ok=not ok, error=error)

            if comment.creator.id == user.id or card.creator.id == user.id:
                comment.delete()
            else: 
                error = "Can't Delete Comment"
            return types.DeleteCommentResponse(ok=not ok, error=error)

        else:
            error = 'You need to log in'
            return types.DeleteCommentResponse(ok=not ok, error=error)

class EditCard(graphene.Mutation):

    class Arguments:
        cardId = graphene.Int(required=True)
        caption = graphene.String()
        location = graphene.String()

    Output = types.EditCardResponse

    def mutate(self, info, **kwargs):

        user = info.context.user
        cardId = kwargs.get('cardId')

        ok = True
        error = None

        if user.is_authenticated:

            try:
                card = models.Card.objects.get(id=cardId)
            except models.Card.DoesNotExist:
                error = "Card Not Found"
                return types.EditCardResponse(ok=not ok, error=error)

            if card.creator.id != user.id:

                error = "Unauthorized"
                return types.EditCardResponse(ok=not ok, error=error)

            else:

                try:

                    caption = kwargs.get('caption', card.caption)
                    location = kwargs.get('location', card.location)

                    card.caption = caption
                    card.location = location

                    card.save()
                    return types.EditCardResponse(ok=ok, error=error, card=card)
                except IntegrityError as e:
                    print(e)
                    error = "Can't Save Card"
                    return types.EditCardResponse(ok=not ok, error=error)

        else:
            error = "You need to log in"
            return types.EditCardResponse(ok=not ok, error=error)


class DeleteCard(graphene.Mutation):

    class Arguments:
        cardId = graphene.Int(required=True)

    Output = types.DeleteCardResponse

    def mutate(self, info, **kwargs):

        user = info.context.user
        cardId = kwargs.get('cardId')

        ok = True
        error = None

        if user.is_authenticated:

            try:
                card = models.Card.objects.get(id=cardId)
            except models.Card.DoesNotExist:
                error = "Card Not Found"
                return types.EditCardResponse(ok=not ok, error=error)

            if card.creator.id == user.id:

                card.delete()
                return types.DeleteCardResponse(ok=ok, error=error)

            else:

                error = "Unauthorized"
                return types.EditCardResponse(ok=not ok, error=error)

        else:
            error = "You need to log in"
            return types.EditCardResponse(ok=not ok, error=error)

class UploadCard(graphene.Mutation):

    class Arguments:
        fileUrl = graphene.String(required=True)
        caption = graphene.String(required=True)
        location = graphene.String()

    Output = types.UploadCardResponse

    def mutate(self, info, **kwargs):

        user = info.context.user

        ok = True
        error = None

        fileUrl = kwargs.get('fileUrl')
        caption = kwargs.get('caption')
        location = kwargs.get('location')

        if user.is_authenticated:

            try: 
                card = models.Card.objects.create(
                    creator=user, caption=caption, location=location, file=fileUrl)
                return types.UploadCardResponse(ok=ok, error=error, card=card)
            except IntegrityError as e:
                print(e)
                error = "Can't Create Card"
                return types.UploadCardResponse(ok=not ok, error=error)
            
        else:

            error = "Unauthorized"
            return types.UploadCardResponse(ok=not ok, error=error)