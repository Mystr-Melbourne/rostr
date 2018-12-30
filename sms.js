// for environment variables to work
var dotenv = require("dotenv").config();

var client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

client.messages
  .create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.CELL_PHONE_NUMBER,
    body: "There is a shift at {Location} during {Time}, {message}, Respond yes/no"
  })
  .then(message => console.log(message.sid));
