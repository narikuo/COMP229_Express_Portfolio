var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//modules for authentication
let session = require("express-session");
let passport = require("passport");
let passportLocal = require("passport-local");
let localStratergy = passportLocal.Strategy;
let flash = require("connect-flash");

////--- database setbup
let mongoose = require("mongoose");
let DB = require("./db");

///////add -> point mongoose to the DB
mongoose.connect(DB.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true});

let mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "connection error: "));
mongodb.once("open", () =>{
  console.log("Database connected");
});


var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var contactsRouter = require('../routes/business_contact');
// create an express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// use the express-static middleware
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, "../../node_modules")));

//setup express session
app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);

//initialize flash
app.use(flash());

//intialize passport
app.use(passport.initialize());
app.use(passport.session());

//passport user configuration --
//create usermodel instance
let userModel = require("../models/user");
let User = userModel.User;

//implement a user authenticaion Strategy
passport.use(User.createStrategy());

//serialize and deserialize user object info -encrypt and decrypt
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
////

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/business', contactsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
