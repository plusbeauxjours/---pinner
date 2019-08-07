from django.core.mail.message import EmailMessage
from django.core.mail import send_mail


def sendVerificationEMAIL(to, key):
    send_mail('Verify Your Email🔒', 'Please verify your email to secure your account. Or paste this link into your browser: {}'.format(
        key), 'no-reply@pinner.fun', [to, ])
    return "koko"


def sendConfirmEMAIL(to, key):
    send_mail('Verify Your Email🔒', 'Please verify your email to secure your account. Or paste this link into your browser: {}'.format(
        key), 'no-reply@pinner.fun', [to, ])
    return "koko"
