import graphene
from django.db import IntegrityError
from . import models, types

class LikeCard(graphene.Mutation):

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
                ok = False
                error = "Card Not Found"
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
                ok = False
                error = "Can't Like Photo"
                return types.LikeCardResponse(ok=not ok, error=error)
        else: 
            ok = False
            error = 'You need to log in'
            return types.LikeCardResponse(ok=not ok, error=error)

class AddComment(graphene.Mutation):

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
                ok = False
                error = "Card Not Found"
                return types.AddCommentResponse(ok=not ok, error=error, comment=comment)
            try: 
                comment = models.Comment.objects.create(
                    message=message, card=card, creator=user)
                return types.AddCommentResponse(ok=ok, error=error, comment=comment)
            except IntegrityError:
                ok = False
                error = "Can't create the comment"
                return types.AddCommentResponse(ok=not ok, error=error, comment=comment)
        else: 
            ok = False
            error = "You need to log in"
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
                ok = False
                error = 'Card Not Found'
                return types.DeleteCommentResponse(ok=not ok, error=error)

            try: 
                comment = models.Comment.objects.get(id=commentId)
            except models.Comment.DoesNotExist:
                ok = False
                error = 'Comment Not Found'
                return types.DeleteCommentResponse(ok=not ok, error=error)

            if comment.creator.id == user.id or card.creator.id == user.id:
                comment.delete()
            else: 
                ok = False
                error = "Can't Delete Comment"
            return types.DeleteCommentResponse(ok=not ok, error=error)

        else:
            ok = False
            error = "You need to log in"
            return types.DeleteCommentResponse(ok=not ok, error=error)