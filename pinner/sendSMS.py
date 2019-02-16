from django.conf import settings
from twilio.rest import Client

TWILIO_SID="ACe45be468996891a959f54a05dbaf164b"
TWILIO_TOKEN="f5fad23d4772fc5249af8f78945987ee"

from_number = "+16623301384"  # With trial account, texts can only be sent from your Twilio number.
to_number = "+66803832506"
message = "Hello world."

client = Client(TWILIO_SID
, TWILIO_TOKEN)

message = client.messages.create(to=to_number,
                                 from_=from_number,
                                 body=message)

print(message)