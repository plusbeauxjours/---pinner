import graphene
from . import models

class LikeCard(graphene.Mutation):

    class Arguments: 
        cardId = graphen.Int(required=True)

        ok = graphene.Boolean(required=True)
        error = graphen.String()

    def mutate(self, info, **kwargs):
        id = kwargs.get('cardId')
        user = info.context.user
        if user.is_authenticated: 
            if id is not None:
                try: 
                    card = models.Card.objects.get(id=id)
                    try: 
                        like = models.Like.objects.get(
                            creator=user, card=card)
                        like.delete()
                    except models.Like.DoesNotExist: 
                        like = models.Like.objects.create(
                            creator=user, card=card)
                        like.save()
                    ok = True
                    return LikeCard(ok=ok)
                except models.Card.DoesNotExist:
                    ok = False
                    error = "Card Not Found"
                    return LikeCard(ok=ok, error=error)
            else:
                ok = False
                error = "ID is mandatory"
                return LikeCard(ok=ok, error=error)
        ok = Falseerror = "You need to log in"
        return LikeCard(ok=ok, error=error)