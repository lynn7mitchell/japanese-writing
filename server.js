var express = require("express");
var path = require("path")
var mongoose = require("mongoose");
const axios = require("axios")
const passport = require('passport')
require('dotenv').config()
// Initialize Express
var app = express();
var PORT = process.env.PORT || 3001;

// if (process.env.NODE_ENV === "production"){
//   app.use(express.static("client/build"))
// }



// Require all models
var db = require("./models");



// Configure middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// passport middleware
app.use(passport.initialize());

// passport config
require ('./config/passport')(passport)

// Connect to the Mongo DB
mongoose
.connect("mongodb://heroku_vv4dfv1h:jua2gkoppb1jb2soeqcbu7s3q9@ds331548.mlab.com:31548/heroku_vv4dfv1h", { useNewUrlParser: true });


//Routes
require("./routes/api/users")(app)

if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));
}

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
