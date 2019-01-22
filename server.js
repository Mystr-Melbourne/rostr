var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var path = require("path");
var User = require("./models/user");
var EmployeeSchedule = require("./models/employeeSchedule");
const http = require("http");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const app = express();
var PORT = process.env.PORT || 8080;
var passportLocalMongoose = require("passport-local-mongoose");
var helpers = require("./app/components/utils/helpers");
var router = express.Router();
var db = require("./db/db.js");
var dotenv = require("dotenv").config();

//Express session
app.use(
  require("express-session")({
    secret: "This is our secret session 2016 for users!",
    resave: false,
    saveUninitialized: false
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//Body-Parser
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

//Landing
app.get("/", autoRedirect, function (req, res) {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

//Public files <this needs to stay right below app.get("/")!!!!
app.use(express.static(__dirname + "/public"));

// TWILIO SMS functionality
// use ngrok to host up the service so that it can receive texts
var client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// TWILIO SMS DISPATCH
app.post("/sms-send", function (req, res) {
  // array holds all the numbers to send a text to
  const numbers = req.body.to;

  console.log(numbers);

  // loop through the numbers to send
  Promise.all(numbers.map(numberIndex => {
      // log number being sent to
      console.log("sending to number " + numberIndex);

      // dispatch SMS via api
      client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: numberIndex,
        body: req.body.des
      });
    }))

    // log to console
    .then(messages => {
      console.log("Messages sent!");
    })
    .catch(err => console.error(err));
});

// OMG WE GOTTA REFACTOR THIS
app.post("/sms", function (req, res) {
  console.log(req);

  const twiml = new MessagingResponse();

  console.log(req.body.Body);

  var empList;
  console.log("ok please");
  req.body.Body = req.body.Body.toLowerCase();

  if (req.body.Body == "y-mon") {
    twiml.message("Alright we have comfirmed your shift");
    EmployeeSchedule.findOneAndUpdate({
        phoneCode: req.body.From
      }, {
        monday_accept: 1
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Employee schedule updated");
        }
      }
    );
  } else if (req.body.Body == "y-tue") {
    twiml.message("Alright we have comfirmed your shift");
    EmployeeSchedule.findOneAndUpdate({
        phoneCode: req.body.From
      }, {
        tuesday_accept: 1
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Employee schedule updated");
        }
      }
    );
  } else if (req.body.Body == "y-wed") {
    twiml.message("Alright we have comfirmed your shift");
    EmployeeSchedule.findOneAndUpdate({
        phoneCode: req.body.From
      }, {
        wednesday_accept: 1
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Employee schedule updated");
        }
      }
    );
  } else if (req.body.Body == "y-thu") {
    twiml.message("Alright we have comfirmed your shift");
    EmployeeSchedule.findOneAndUpdate({
        phoneCode: req.body.From
      }, {
        thursday_accept: 1
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Employee schedule updated");
        }
      }
    );
  } else if (req.body.Body == "y-fri") {
    twiml.message("Alright we have comfirmed your shift");
    EmployeeSchedule.findOneAndUpdate({
        phoneCode: req.body.From
      }, {
        friday_accept: 1
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Employee schedule updated");
        }
      }
    );
  } else if (req.body.Body == "y-sat") {
    twiml.message("Alright we have comfirmed your shift");
    EmployeeSchedule.findOneAndUpdate({
        phoneCode: req.body.From
      }, {
        saturday_accept: 1
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Employee schedule updated");
        }
      }
    );
  } else if (req.body.Body == "y-sun") {
    twiml.message("Alright we have comfirmed your shift");
    EmployeeSchedule.findOneAndUpdate({
        phoneCode: req.body.From
      }, {
        sunday_accept: 1
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Employee schedule updated");
        }
      }
    );
  } else if (req.body.Body == "n-mon") {
    twiml.message("We understand you cannot work");
    EmployeeSchedule.findOneAndUpdate({
        phoneCode: req.body.From
      }, {
        monday_accept: 2
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Employee schedule updated");
        }
      }
    );
    /* sry for hard coding */
  } else if (req.body.Body == "n-tue") {
    twiml.message("We understand you cannot work");
    EmployeeSchedule.findOneAndUpdate({
        phoneCode: req.body.From
      }, {
        tuesday_accept: 2
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Employee schedule updated");
        }
      }
    );
  } else if (req.body.Body == "n-wed") {
    twiml.message("We understand you cannot work");
    EmployeeSchedule.findOneAndUpdate({
        phoneCode: req.body.From
      }, {
        wednesday_accept: 2
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Employee schedule updated");
        }
      }
    );
  } else if (req.body.Body == "n-thu") {
    twiml.message("We understand you cannot work");
    EmployeeSchedule.findOneAndUpdate({
        phoneCode: req.body.From
      }, {
        thursday_accept: 2
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Employee schedule updated");
        }
      }
    );
  } else if (req.body.Body == "n-fri") {
    twiml.message("We understand you cannot work");
    EmployeeSchedule.findOneAndUpdate({
        phoneCode: req.body.From
      }, {
        friday_accept: 2
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Employee schedule updated");
        }
      }
    );
  } else if (req.body.Body == "n-sat") {
    twiml.message("We understand you cannot work");
    EmployeeSchedule.findOneAndUpdate({
        phoneCode: req.body.From
      }, {
        saturday_accept: 2
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Employee schedule updated");
        }
      }
    );
  } else if (req.body.Body == "n-sun") {
    twiml.message("We understand you cannot work");
    EmployeeSchedule.findOneAndUpdate({
        phoneCode: req.body.From
      }, {
        sunday_accept: 2
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Employee schedule updated");
        }
      }
    );
  } else {
    twiml.message("I did not quite understand that, can you please say yes/no");
  }

  res.writeHead(200, {
    "Content-Type": "text/xml"
  });
  res.end(twiml.toString());
});

//LOCAL AUTH
app.post("/register", function (req, res) {
  if (req.body.redirect == 0) {
    // no redirect
    User.register(
      new User({
        username: req.body.username,
        email: req.body.email,
        userType: req.body.userType,
        picture: "https://raw.githubusercontent.com/clsavino/react-shift-scheduler/master/public/assets/images/logo.png"
      }),

      req.body.password,
      function (err, user) {
        if (err) {
          res.sendFile(path.resolve(__dirname, "public", "error.html"));
          console.log(err);
        } else {
          passport.authenticate("local")(req, res, function () {
            //  res.redirect("/");
          });
        }
      }
    );
  } else {
    User.register(
      new User({
        _id: req.body._id,
        username: req.body.username,
        email: req.body.email,
        userType: req.body.userType,
        picture: "https://raw.githubusercontent.com/clsavino/react-shift-scheduler/master/public/assets/images/logo.png"
      }),

      req.body.password,
      function (err, user) {
        if (err) {
          res.sendFile(path.resolve(__dirname, "public", "error.html"));
          console.log(err);
        } else {
          passport.authenticate("local")(req, res, function () {
            res.redirect("/");
          });
        }
      }
    );
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    // successRedirect: "/manager",
    failureRedirect: "/"
  }),
  function (req, res) {
    reRoute(req, res);
  }
);

//Functions for Auth
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function reRoute(req, res) {
  if (req.user.userType === "manager") {
    res.redirect("/manager");
  } else {
    res.redirect("/employee");
  }
}

function autoRedirect(req, res, next) {
  if (req.isAuthenticated()) {
    reRoute(req, res);
  } else {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  }
}

app.get("/user", function (req, res) {
  res.send(req.user);
});

//Restricting routes
app.get("/login", function (req, res) {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.get("/register", function (req, res) {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.get("/manager", isLoggedIn, function (req, res) {
  if (req.user.userType === "manager") {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  } else {
    res.sendFile(path.resolve(__dirname, "public", "notauth.html"));
  }
});

app.get("/manager/*", isLoggedIn, function (req, res) {
  if (req.user.userType === "manager") {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  } else {
    res.sendFile(path.resolve(__dirname, "public", "notauth.html"));
  }
});

app.get("/employee", isLoggedIn, function (req, res) {
  if (req.user.userType === "employee") {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  } else {
    res.redirect("/manager");
  }
});

app.get("/employee/*", isLoggedIn, function (req, res) {
  if (req.user.userType === "employee") {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  } else {
    res.redirect("/manager");
  }
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

var routes = require("./controllers/db_controller.js");
app.use("/", isLoggedIn, routes);

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "public", "404.html"));
});

http.createServer(app).listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
  console.log("\nOpen up the website on http://localhost:" + PORT + "\n");
});