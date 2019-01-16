### [Please check out our wiki!](https://github.com/Mystr-Melbourne/Rostr/wiki)

# <img src="https://raw.githubusercontent.com/Mystr-Melbourne/rostr/master/public/assets/images/M.png" width="25"> Rostr

Rostr is an employee management and scheduling app that allows…
* Managers to manage and schedule employees
* Employees to view work scheduleso

View app live on [Heroku](https://rostrlive.herokuapp.com/)
*Heroku version doesn't support SMS push notification*

```
Login details:
--------------
username: admin
password: root
```

## Run locally

Rostr requires [Node.js](https://nodejs.org/) and [MongoDB](https://docs.mongodb.com/manual/installation/) to run

### Installation
Once mongo is installed, open a new terminal and run 

`$ mongod`

Open another terminal window and navigate to project directory and run

`$ npm install`

Create a .env file with and add the code below (not strings)

``` 
# twillio account authentication
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=

# phone numbers
TWILIO_PHONE_NUMBER=
CELL_PHONE_NUMBER=
```

If you dont want to go through the trouble of creating the API keys, put in dummy numbers/text and the app should still work, however passport social login will not.

### Run App

Use this command to automatically build and run the environment with one command

`$ npm run dev`

---

otherwise you can manually build with

`$ npm run build`

Wait for webpack to bundle then

`$ npm start`

Open a browser and go to [http://localhost:8080](http://localhost:8080)

## Original Developers of [Schedulr](https://github.com/clsavino/react-shift-scheduler) on which this project is based
* Andrea Roche @amr08
* Christi Savino @clsavino
* Houston Breedlove @hcbreedl
* Nicolás Cáceres @mr-attack

## Tech
Built with React, Node, Express, MongoDB, Passport.js
