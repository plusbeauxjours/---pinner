import graphene
from django.db import IntegrityError
from . import models, types

class LikeCard(graphene.Mutation):

    """ Like an Card """

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
                like = models.Like.objects.get(
                    creator=user, card=card)
                like.delete()
                return types.LikeCardResponse(ok=ok, error=error)
            except models.Like.DoesNotExist:
                pass

            try:
                like = models.Like.objects.create(
                    creator=user, card=card)
                like.save()
                return types.LikeCardResponse(ok=ok, error=error)
            except IntegrityError:
                error = "Can't Like Card"
                return types.LikeCardResponse(ok=not ok, error=error)
        else: 
            error = 'You need to log in'
            return types.LikeCardResponse(ok=not ok, error=error)

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
            except IntegrityError:
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