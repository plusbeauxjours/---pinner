from django.conf import settings
from twilio.rest import Client

TWILIO_SID = "ACe45be468996891a959f54a05dbaf164b"
TWILIO_TOKEN = "f5fad23d4772fc5249af8f78945987ee"
from_number = "+16623301384"
client = Client(TWILIO_SID, TWILIO_TOKEN)


def sendSMS(to, body):
    return client.messages.create(to=to,
                                  from_=from_number,
                                  body=body)


def sendVerificationSMS(to, key):
    return sendSMS(to, "Your verification key is: {}".format(key))
