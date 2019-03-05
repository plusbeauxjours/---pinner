from django.conf import settings
import random


def generatePercentage(min=25, max=75):
    print('hello')
    randomRadius = str(random.randrange(min, max))
    percentage1 = (random.randrange(min, max))
    percentage11 = 100 - percentage1
    percentage2 = (random.randrange(min, max))
    percentage21 = 100 - percentage2
    percentage3 = (random.randrange(min, max))
    percentage31 = 100 - percentage3
    percentage4 = (random.randrange(min, max))
    percentage41 = 100 - percentage4
    borderRadius = "{}% {}% {}% {}% / {}% {}% {}% {}%".format(
        percentage1,
        percentage11,
        percentage21,
        percentage2,
        percentage3,
        percentage4,
        percentage41,
        percentage31
    )
    print(borderRadius)
    return borderRadius


def generateFontFamily():
    print('')
    return ""
