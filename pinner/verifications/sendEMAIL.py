from django.conf import settings
from django.core.mail import send_mail
from django.template import loader
from django.template.loader import get_template
from django.template.loader import render_to_string


def sendVerificationEMAIL(to, key):
    print(to)
    subject = 'Verify Your Email🔒'
    to = [to,'plusbeauxjours.home@gmail.com', ]
    key = 'http://localhost:3000/verification/{}'.format(key)
    ctx = {'key': key}
    msg_html = render_to_string('account/email_confirm.html', ctx)
    send_mail(subject, msg_html, 'no-reply@pinner.fun', to, html_message=msg_html)
    return;

def sendConfirmEMAIL(to, key):
    subject = 'Verify Your Email🔒'
    to = [to,'plusbeauxjours.home@gmail.com', ]
    key = 'http://localhost:3000/confirm/{}'.format(key)
    ctx = {'key': key}
    msg_html = render_to_string('account/email_confirm.html', ctx)
    send_mail(subject, msg_html, 'no-reply@pinner.fun', to, html_message=msg_html)
    return;