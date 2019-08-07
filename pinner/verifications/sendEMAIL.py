from django.core.mail.message import EmailMessage
from django.core.mail import send_mail


def sendVerificationEMAIL(to, key):
    print(to)
    send_mail('Verify Your Email🔒', 'Please verify your email to secure your account. Or paste this link into your browser: http://localhost:3000/verification/{}'.format(
        key), 'no-reply@pinner.fun', ['plusbeauxjours.home@gmail.com', ])

    return "koko"


def sendConfirmEMAIL(to, key):
    print(to)
    send_mail('Verify Your Email🔒', 'Please verify your email to secure your account. Or paste this link into your browser: http://localhost:3000/confirm/{}'.format(
        key), 'no-reply@pinner.fun', ['plusbeauxjours.home@gmail.com', ])
    return "koko"
