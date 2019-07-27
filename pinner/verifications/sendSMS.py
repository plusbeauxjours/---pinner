from django.conf import settings
from twilio.rest import Client

TWILIOSID = settings.TWILIOSID
TWILIOTOKEN = settings.TWILIOTOKEN

FROM = settings.FROM
print(TWILIOSID, TWILIOTOKEN, FROM)
ADMIN_ID = settings.ADMIN_ID
SLACK_TOKEN = settings.SLACK_TOKEN
SENTRY_DSN = settings.SENTRY_DSN
print(ADMIN_ID,
      SLACK_TOKEN,
      SENTRY_DSN)


client = Client(TWILIOSID, TWILIOTOKEN)


def sendSMS(to, body):
    return client.messages.create(to=to,
                                  from_=FROM,
                                  body=body)


def sendVerificationSMS(to, key):
    return sendSMS(to, "Your verification key is: {}".format(key))
