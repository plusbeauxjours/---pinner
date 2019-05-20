from django.conf import settings
from twilio.rest import Client

TWILIO_SID = "ACeff95fa032e064459f62ff59c89ef78c"
TWILIO_TOKEN = "b5a234ecd9da3ff3cc47d784e01ea0e6"
from_number = "+12025688737"

client = Client(TWILIO_SID, TWILIO_TOKEN)


def sendSMS(to, body):
    print(to)
    return client.messages.create(to=to,
                                  from_=from_number,
                                  body=body)


def sendVerificationSMS(to, key):
    return sendSMS(to, "Your verification key is: {}".format(key))
