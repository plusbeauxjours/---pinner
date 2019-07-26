from django.conf import settings
from twilio.rest import Client

twilio_sid = settings.TWILIO_SID
twilio_token = settings.TWILIO_TOKEN

from_number = settings.FROM
print(twilio_sid, twilio_token, from_number)


client = Client('ACe873d3e3e2da7f4231ca9e83669c2f9b', '447e1871da981a84c145c3915ecdc065')


def sendSMS(to, body):
    return client.messages.create(to=to,
                                  from_=from_number,
                                  body=body)


def sendVerificationSMS(to, key):
    return sendSMS(to, "Your verification key is: {}".format(key))
