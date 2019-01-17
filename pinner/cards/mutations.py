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
        error = ''
        if user.is_authenticated: 
            try:
                card = models.Card.objects.get(id=cardId)
                try: 
                    like = models.Like.objects.get(
                        creator=user, card=card)
                    like.delete()
                except models.Like.DoesNotExist: 
                    like = models.Like.objects.create(
                        creator=user, card=card)
                    like.save()
                ok = True
            except models.Card.DoesNotExist:
                ok = False
                error = "Card Not Found"
        else: 
            ok = False
            error = 'You need to log in'
        return types.LikeCardResponse(ok=ok, error=error)

class AddComment(graphene.Mutation):

    class Arguments: 
        imageId = graphene.Int(required=True)
        mesage = graphene.String(required=True)

    Output = types.AddCommentResponse

    def mutate(self, info, **kwargs):
        cardId = kwargs.get('cardId')
        message = kwargs.get('message')

        user = info.context.user

        ok = True
        error = ''
        comment = None

        if user.is_authenticated:
            try: 
                card = models.Image.objects.get(id=cardId)
                try:
                    comment = models.Comment.objects.create(
                        mesage=message, card=card, creator=user) 
                except IntegrityError:
                    ok = False
                    error = "Can't create the comment"
            except models.Card.DoesNotExist:
                ok = Falseerror = "Image Not Found"
        else: 
            ok = False
            error = "You need to log in"
        return types.AddCommentResponse(ok=ok, error=error, comment=comment)