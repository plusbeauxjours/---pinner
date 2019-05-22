from django.conf import settings
from twilio.rest import Client

TWILIO_SID = settings.TWILIO_SID
TWILIO_TOKEN = settings.TWILIO_TOKEN

from_number = "+12025688737"

client = Client(TWILIO_SID, TWILIO_TOKEN)


def sendSMS(to, body):
    print(to)
    return client.messages.create(to=to,
                                  from_=from_number,
                                  body=body)


def sendVerificationSMS(to, key):
    return sendSMS(to, "Your verification key is: {}".format(key))
